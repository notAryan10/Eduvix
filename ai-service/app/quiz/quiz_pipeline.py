from app.quiz.question_generator import question_generator

def get_adaptive_quiz(subject, difficulty="medium", num_questions=5, user_id="default"):
    """
    Coordinates quiz generation and potential difficulty adjustments.
    """
    quiz = question_generator.generate_quiz(subject, difficulty, num_questions, user_id)
    return quiz
