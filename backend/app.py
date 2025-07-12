from flask import Flask
from flask_cors import CORS
from extensions import db
from models import User, Question, Answer
from routes import all_blueprints

def create_app():
    app = Flask(__name__)
    CORS(app)

    # DB Config
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stackhub.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()

    for bp in all_blueprints:
        app.register_blueprint(bp, url_prefix=f"/{bp.name}")

    @app.route('/')
    def index():
        return {"message": "Stackhub backend is running!"}

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
