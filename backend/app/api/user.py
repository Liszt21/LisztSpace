from flask import jsonify, request
from app.api import bp
from app.extensions import db
from app.models import User

@bp.route("/user/<int:id>", methods=["GET"])
def user(id):
    user = User.query.get_or_404(id)
    return user

@bp.route("/user", methods=["POST"])
def register():
    username = request.form.get("username")
    password = request.form.get("password")
    data = {
        'username': username,
        'password': password
    }
    message = {}
    if 'username' not in data or not data.get('username', None).strip():
        message['username'] = 'Please provide a valid username.'
    pattern = '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
    if 'password' not in data or not data.get('password', None).strip():
        message['password'] = 'Please provide a valid password.'

    if User.query.filter_by(username=data.get('username', None)).first():
        message['username'] = 'Please use a different username.'
    if message:
        return message

    user = User()
    user.username = username
    user.password = password
    db.session.add(user)
    db.session.commit()

    return message
