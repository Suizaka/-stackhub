from flask import Blueprint, request, jsonify
from models import Answer
from extensions import db

answers_bp = Blueprint('answers', __name__)

@answers_bp.route('', methods=['POST'])
def add_answer():
    data = request.json
    body = data.get('body')
    user_id = data.get('user_id')
    question_id = data.get('question_id')

    if not body or not user_id or not question_id:
        return jsonify({"error": "Missing data"}), 400

    answer = Answer(body=body, user_id=user_id, question_id=question_id)
    db.session.add(answer)
    db.session.commit()

    return jsonify({
        "message": "Answer added!",
        "answer": {
            "id": answer.id,
            "body": answer.body,
            "user_id": answer.user_id,
            "question_id": answer.question_id
        }
    }), 201

# ✅ Bonus: get all answers for a question
@answers_bp.route('/<int:question_id>', methods=['GET'])
def get_answers(question_id):
    answers = Answer.query.filter_by(question_id=question_id).all()
    result = [
        {
            "id": a.id,
            "body": a.body,
            "user_id": a.user_id,
            "question_id": a.question_id
        } for a in answers
    ]
    return jsonify(result), 200
