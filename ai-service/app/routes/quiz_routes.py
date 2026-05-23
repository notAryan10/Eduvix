from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.quiz.quiz_pipeline import get_adaptive_quiz

router = APIRouter()

class QuizRequest(BaseModel):
    subject: str
    difficulty: str = "medium"
    num_questions: int = 5
    user_id: Optional[str] = "default"

@router.post("/generate-quiz")
async def generate_quiz(request: QuizRequest):
    try:
        quiz = get_adaptive_quiz(
            request.subject, 
            request.difficulty, 
            request.num_questions, 
            request.user_id
        )
        if isinstance(quiz, dict) and "error" in quiz:
            raise HTTPException(status_code=400, detail=quiz["error"])
        return quiz
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
