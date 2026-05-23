from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.gamification.motivation_engine import motivation_engine

router = APIRouter()

class MotivationRequest(BaseModel):
    student_name: Optional[str] = "Explorer"

@router.post("/get-motivation")
async def get_motivation(request: MotivationRequest):
    try:
        message = motivation_engine.get_motivational_quote(request.student_name)
        return {"message": message}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
