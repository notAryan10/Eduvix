from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.rag.rag_pipeline import rag_pipeline
import os

router = APIRouter()

class ProcessPDFRequest(BaseModel):
    file_path: str
    user_id: Optional[str] = "default"

class AskRequest(BaseModel):
    query: str
    user_id: Optional[str] = "default"

@router.post("/process-pdf")
async def process_pdf(request: ProcessPDFRequest):
    if not os.path.exists(request.file_path):
        raise HTTPException(status_code=404, detail="PDF file not found")
    
    try:
        result = rag_pipeline.process_new_pdf(request.file_path, request.user_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ask")
async def ask_question(request: AskRequest):
    try:
        result = rag_pipeline.answer_question(request.query, request.user_id)
        if "error" in result:
            # Don't throw error, just return empty context
            return {"answer": "I don't have any textbooks for you yet! Please upload a PDF to help me learn.", "context": "", "sources": []}
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
