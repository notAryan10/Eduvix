import os
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings

def get_embeddings_model(model_name="BAAI/bge-small-en-v1.5"):
    """
    Initializes and returns the HuggingFace Inference API embeddings.
    This version uses the cloud API to save memory (Render Free Tier).
    """
    api_key = os.getenv("HUGGINGFACE_API_KEY")
    
    # If no key is provided, it might fail in production, 
    # but we'll try to use the community version or throw a clear error.
    if not api_key:
        print("WARNING: HUGGINGFACE_API_KEY not found. Local fallback would use >512MB RAM.")
    
    embeddings = HuggingFaceInferenceAPIEmbeddings(
        api_key=api_key, 
        model_name=model_name
    )
    return embeddings
