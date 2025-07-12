from flask import Blueprint, request, jsonify
from models import Question
from extensions import db

votes_bp = Blueprint('votes', __name__)

@votes_bp.route('', methods=['POST'])
def vote():
    data = request.json
    question_id = data.get('id')
    direction = data.get('vote')  # "up" or "down"

    if not question_id or direction not in ['up', 'down']:
        return jsonify({"error": "Invalid data"}), 400

    question = Question.query.get(question_id)
    if not question:
        return jsonify({"error": "Question not found"}), 404

    if direction == 'up':
        question.votes = getattr(question, 'votes', 0) + 1
    else:
        question.votes = getattr(question, 'votes', 0) - 1

    db.session.commit()

    return jsonify({
        "message": "Vote updated!",
        "question_id": question.id,
        "votes": question.votes
    }), 200

