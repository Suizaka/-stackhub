from flask import Flask, jsonify
from flask_cors import CORS
import os

from extensions import db
from models import User, Question, Answer
from routes import api_bp

app = Flask(__name__)
CORS(app)

# Database configuration
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, 'stackhub.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_PATH}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Register API routes
app.register_blueprint(api_bp, url_prefix='/api')

# Create the database file & tables
with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return jsonify(message="Stackhub backend is alive!")

if __name__ == '__main__':
    app.run(debug=True)
