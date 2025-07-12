from flask import Blueprint, request, jsonify
from models import Question
from extensions import db

questions_bp = Blueprint('questions', __name__)

@questions_bp.route('', methods=['GET'])
def get_questions():
    questions = Question.query.all()
    result = [
        {
            'id': q.id,
            'title': q.title,
            'body': q.body,
            'user_id': q.user_id
        }
        for q in questions
    ]
    return jsonify(result), 200

@questions_bp.route('', methods=['POST'])
def post_question():
    data = request.get_json()
    title = data.get('title')
    body = data.get('body')
    user_id = data.get('user_id')

    if not title or not body or not user_id:
        return jsonify({'error': 'Missing required fields'}), 400

    new_question = Question(title=title, body=body, user_id=user_id)
    db.session.add(new_question)
    db.session.commit()

    return jsonify({'message': 'Question added successfully'}), 201

