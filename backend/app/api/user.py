from flask import jsonify, request, g
from app.api import bp
from app.extensions import db
from app.models import User
from app.api.auth import auth


@bp.route("/user", methods=["GET"])
@auth.login_required
def user():
    return jsonify(g.current_user.to_dict())


@bp.route("/user/list")
def user_list():
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
    body = request.get_json()
    # valid
    if not body:
        return {"message": "Empty body"}

    if "username" not in body.keys():
        return {"message": "Please provide username!"}, 400
    elif User.query.filter_by(username=body["username"]).first():
        return {
            "message": "Username {} already exist. Please use another.".format(
                body["username"]
            )
        }, 409

    if "password" not in body.keys():
        return {"message": "Please provide password!"}, 400

    if "email" not in body.keys():
        return {"message": "Please provide email address!"}, 400

    user = User()
    user.register(body)
    db.session.add(user)
    db.session.commit()
    token = user.get_jwt()

    return {"message": "Registeration successful!", "token": token}


@bp.route("/user", methods=["PUT"])
@auth.login_required
def update():
    body = request.get_json()
    if not body:
        return {"message": "Empty body, nothing changed!"}, 400
    message = g.current_user.update(body)
    if (
        "new_password" in body.keys()
        and "old_password" in body.keys()
        and g.current_user.check_password(body["old_password"])
        and body["new_password"] != body["old_password"]
    ):
        g.current_user.set_password(body["new_password"])
        message["password"] = "Updated!!!"

    db.session.commit()

    return message


@bp.route("/user", methods=["DELETE"])
@auth.login_required
def delete_user():
    """删除一个用户"""
    db.session.delete(g.current_user)
    db.session.commit()
    return "User: {} deleted!!!".format(g.current_user.username)
