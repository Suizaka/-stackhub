from flask import Flask
from flask_cors import CORS
from extensions import db

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Config
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stackhub.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    db.init_app(app)

    # Import models after db is ready (fixes circular import)
    with app.app_context():
        from models import User, Question, Answer
        db.create_all()

    @app.route('/')
    def index():
        return {"message": "Stackhub backend is running!"}

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
