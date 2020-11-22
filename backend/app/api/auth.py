from flask import g
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from app.api.error import error_response
from app.extensions import db
from app.models import User

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()


@basic_auth.verify_password
def verify_password(username, password):
    '''用于检查用户提供的用户名和密码'''
    user = User.query.filter_by(username=username).first()
    if user is None:
        return False
    g.current_user = user
    return user.check_password(password)


@basic_auth.error_handler
def basic_auth_error():
    '''用于在认证失败的情况下返回错误响应'''
    return error_response(401)


