from flask_sqlalchemy import SQLAlchemy
from app import db

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    body = db.Column(db.Text, nullable=False)

    # Foreign Key
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Relationships
    answers = db.relationship('Answer', backref='question', lazy=True)

    def __repr__(self):
        return f"<Question {self.title}>"
