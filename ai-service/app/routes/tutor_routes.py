from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from app.tutoring.adaptive_tutor import adaptive_tutor
from app.tutoring.revision_engine import revision_engine
from app.tutoring.student_analyzer import student_analyzer
from app.tutoring.spelling_generator import spelling_generator

router = APIRouter()

class ChatRequest(BaseModel):
    query: str
    learning_profile: Dict[str, Any]
    session_history: Optional[List[Dict[str, str]]] = None

class RevisionRequest(BaseModel):
    learning_profile: Dict[str, Any]

class AnalysisRequest(BaseModel):
    quiz_results: Dict[str, Any]
    current_profile: Dict[str, Any]

class SpellingRequest(BaseModel):
    learning_profile: Dict[str, Any]
    num_words: Optional[int] = 5

@router.post("/adaptive-teach")
async def adaptive_teach(request: ChatRequest):
    try:
        response = adaptive_tutor.generate_response(
            request.query, 
            request.learning_profile, 
            request.session_history
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-revision")
async def generate_revision(request: RevisionRequest):
    try:
        plan = revision_engine.generate_plan(request.learning_profile)
        return plan
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-student")
async def analyze_student(request: AnalysisRequest):
    try:
        analysis = student_analyzer.analyze_performance(
            request.quiz_results, 
            request.current_profile
        )
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-spelling")
async def generate_spelling(request: SpellingRequest):
    try:
        words = spelling_generator.generate_spelling_words(
            request.learning_profile, 
            request.num_words
        )
        return words
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
