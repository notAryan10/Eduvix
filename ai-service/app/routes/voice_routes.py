from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from app.speech.voice_tutor import voice_tutor

router = APIRouter()

class VoiceChatRequest(BaseModel):
    query: str
    learning_profile: Dict[str, Any]
    session_history: Optional[List[Dict[str, str]]] = None

@router.post("/voice-teach")
async def voice_teach(request: VoiceChatRequest):
    try:
        response = voice_tutor.process_voice_query(
            request.query, 
            request.learning_profile, 
            request.session_history
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
