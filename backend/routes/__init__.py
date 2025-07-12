from flask import Blueprint, request, jsonify
from app import db
from models import User, Question, Answer

api_bp = Blueprint('api', __name__)

# ✅ Get all questions
@api_bp.route('/questions', methods=['GET'])
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

# ✅ Post a new question
@api_bp.route('/questions', methods=['POST'])
def post_question():
    data = request.get_json()
    title = data.get('title')
    body = data.get('body')
    user_id = data.get('user_id')

    if not title or not body or not user_id:
        return jsonify({'error': 'Missing required fields'}), 400

    new_question_

