from app import create_app
from app.extensions import db
from app.models import User
from config import Config
import click

app = create_app(Config)


@app.route("/")
def index():
    return "Hello, World!"


@app.shell_context_processor
def make_shell_context():
    return {"db": db, "User": User}


@app.cli.command("run")
def run():
    app.run(host="0.0.0.0", debug=True)


@app.cli.command("shell")
def shell():
    app.shell()


if __name__ == "__main__":
    app.cli()
