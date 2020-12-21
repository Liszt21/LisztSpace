from datetime import datetime, timedelta
import json
import jwt
from flask import url_for, current_app
from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    __table_name__ = "user"
    _fields = [
        "id",
        "name",
        "email",
        "username",
        "about_me",
        "nation",
        "birthday",
        "confirmed",
        "last_seen",
        "home_place",
        "hobby",
        "major",
        "member_since",
    ]
    _mutable = [
        "name",
        "about_me",
        "birthday",
        "hobby",
        "major",
        "nation",
        "home_place",
    ]
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    name = db.Column(db.String(64))
    password_hash = db.Column(db.String(128), nullable=False)
    location = db.Column(db.String(64))
    about_me = db.Column(db.Text())
    member_since = db.Column(db.DateTime(), default=datetime.utcnow)
    last_seen = db.Column(db.DateTime(), default=datetime.utcnow)
    confirmed = db.Column(db.Boolean, default=False)
    nation = db.Column(db.String(64))
    hobby = db.Column(db.String(128))
    birthday = db.Column(db.String(32))
    home_place = db.Column(db.String(128))
    major = db.Column(db.String(64))

    def __repr__(self):
        return "<User {}>".format(self.username)

    def set_password(self, password):
        """设置用户密码，保存为 Hash 值"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """验证密码与保存的 Hash 值是否匹配"""
        return check_password_hash(self.password_hash, password)

    def register(self, data):
        self.set_password(data["password"])
        self.username = data["username"]
        self.email = data["email"]
        self.member_since = datetime.utcnow()
        self.update(data)
        return True

    def update(self, data):
        result = {}
        for field in self._mutable:
            if field in data and getattr(self, field) != data[field]:
                result[field] = "{} => {}".format(getattr(self, field), data[field])
                setattr(self, field, data[field])
        return result

    def to_dict(self, fields=None):
        data = {}
        for field in fields if fields else self._fields:
            if field in self._fields:
                data[field] = getattr(self, field)
        return data

    def ping(self):
        """更新用户的最后访问时间"""
        self.last_seen = datetime.utcnow()
        db.session.add(self)

    def get_jwt(self, expires_in=3600):
        """用户登录后，发放有效的 JWT"""
        now = datetime.utcnow()
        payload = {
            "user_id": self.id,
            "user_name": self.name if self.name else self.username,
            "exp": now + timedelta(seconds=expires_in),
            "iat": now,
        }
        return jwt.encode(
            payload, current_app.config["SECRET_KEY"], algorithm="HS256"
        ).decode("utf-8")

    @staticmethod
    def verify_jwt(token):
        """验证 JWT 的有效性"""
        try:
            payload = jwt.decode(
                token, current_app.config["SECRET_KEY"], algorithms=["HS256"]
            )
        except (
            jwt.exceptions.ExpiredSignatureError,
            jwt.exceptions.InvalidSignatureError,
            jwt.exceptions.DecodeError,
        ) as _:
            # Token过期，或被人修改，那么签名验证也会失败
            return None
        return User.query.get(payload.get("user_id"))
