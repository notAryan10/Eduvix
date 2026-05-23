from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from app.rag.rag_pipeline import rag_pipeline
import os
import shutil
import tempfile
from typing import Optional

router = APIRouter()

@router.post("/process-pdf")
async def process_pdf(user_id: str = Form(...), file: UploadFile = File(...)):
    # Create a temporary file to save the upload
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    try:
        result = rag_pipeline.process_new_pdf(tmp_path, user_id)
        # Cleanup
        os.remove(tmp_path)
        return result
    except Exception as e:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
        raise HTTPException(status_code=500, detail=str(e))

class AskRequest(BaseModel):
    query: str
    user_id: Optional[str] = "default"

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
