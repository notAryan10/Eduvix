from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.rag.rag_pipeline import rag_pipeline
import os

router = APIRouter()

class ProcessPDFRequest(BaseModel):
    file_path: str

class AskRequest(BaseModel):
    query: str

@router.post("/process-pdf")
async def process_pdf(request: ProcessPDFRequest):
    if not os.path.exists(request.file_path):
        raise HTTPException(status_code=404, detail="PDF file not found")
    
    try:
        result = rag_pipeline.process_new_pdf(request.file_path)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ask")
async def ask_question(request: AskRequest):
    try:
        result = rag_pipeline.answer_question(request.query)
        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
