from flask import jsonify, request, g
from app.api import bp
from app.extensions import db
from app.models import User
from app.api.auth import basic_auth, token_auth, auth


@bp.route("/user/info", methods=["GET"])
@auth.login_required
def user():
    return jsonify(g.current_user.to_dict())


@bp.route("/user/list")
def all_user():
    result = {"users": [user.username for user in User.query.all()]}
    result["count"] = len(result["users"])
    return result


@bp.route("/token")
@auth.login_required
def signin():
    result = {"token": g.current_user.get_jwt()}
    return jsonify(result)


@bp.route("/user", methods=["POST"])
def register():
    message = {}
    if "username" not in request.form or not request.form.get("username", None).strip():
        message["username"] = "Please provide a valid username."
    pattern = '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
    if "password" not in request.form or not request.form.get("password", None).strip():
        message["password"] = "Please provide a valid password."

    if User.query.filter_by(username=request.form.get("username", None)).first():
        message["username"] = "Please use a different username."

    if message:
        return message

    user = User()
    user.register(request.form)
    db.session.add(user)
    db.session.commit()
    message = "Registration successful"

    return message


@bp.route("/user", methods=["DELETE"])
@auth.login_required
def delete_user():
    """删除一个用户"""
    db.session.delete(g.current_user)
    db.session.commit()
    return "", 204
