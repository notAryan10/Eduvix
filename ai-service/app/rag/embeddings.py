import os
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings

def get_embeddings_model(model_name="BAAI/bge-small-en-v1.5"):
    """
    Initializes and returns the HuggingFace Inference API embeddings.
    Using the stable community version for better cloud compatibility.
    """
    api_key = os.getenv("HUGGINGFACE_API_KEY")
    
    if not api_key:
        print("WARNING: HUGGINGFACE_API_KEY not found. Cloud deployment requires this.")
    
    embeddings = HuggingFaceInferenceAPIEmbeddings(
        api_key=api_key, 
        model_name=model_name
    )
    return embeddings
