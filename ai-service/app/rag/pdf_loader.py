from langchain_community.document_loaders import PyPDFLoader
import os

def load_pdf(file_path: str):
    """
    Loads a PDF file and extracts text using PyPDFLoader.
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"PDF file not found at: {file_path}")
    
    loader = PyPDFLoader(file_path)
    documents = loader.load()
    return documents
