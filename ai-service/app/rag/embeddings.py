import os
from langchain_huggingface import HuggingFaceEndpointEmbeddings

def get_embeddings_model(model_name="BAAI/bge-small-en-v1.5"):
    """
    Initializes and returns the HuggingFace Endpoint embeddings.
    Using the newer langchain-huggingface package.
    """
    api_key = os.getenv("HUGGINGFACE_API_KEY")
    
    if not api_key:
        print("WARNING: HUGGINGFACE_API_KEY not found. Render Free Tier requires cloud embeddings.")
    
    embeddings = HuggingFaceEndpointEmbeddings(
        huggingfacehub_api_token=api_key,
        model=model_name
    )
    return embeddings
