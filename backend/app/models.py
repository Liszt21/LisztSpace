from flask import url_for, current_app
from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    __table_name__ = "user"
    _fields = ['username', 'name']
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String(128), nullable=False)
    name = db.Column(db.String(128))
    password_hash = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        '''设置用户密码，保存为 Hash 值'''
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        '''验证密码与保存的 Hash 值是否匹配'''
        return check_password_hash(self.password_hash, password)

    def register(self, data):
        self.from_dict(data)
        self.set_password(data['password'])
        return True

    def from_dict(self, data):
        for field in ['username', 'name']:
            if field in data:
                setattr(self, field, data[field])
        return True

    def to_dict(self, fields = ['username', 'name', 'email']):
        data = {}
        for field in fields:
            if field in self._fields:
                data[field] = getattr(self, field)

        return data
