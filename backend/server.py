from app import create_app
from app.extensions import db
from config import Config

app = create_app(Config)

@app.route('/')
def index():
    return 'Hello, World!'


@app.shell_context_processor
def make_shell_context():
    return {'db': db}

if __name__ == "__main__":
    app.run(debug=True)