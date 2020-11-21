from app.extensions import db


class User(db.Model):
    __table_name__ = "user"
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String(128), nullable=False)
    name = db.Column(db.String(128))
    password = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        '''设置用户密码，保存为 Hash 值'''
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        '''验证密码与保存的 Hash 值是否匹配'''
        return check_password_hash(self.password_hash, password)
