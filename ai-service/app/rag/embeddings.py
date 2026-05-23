from langchain_huggingface import HuggingFaceEmbeddings

def get_embeddings_model(model_name="BAAI/bge-small-en-v1.5"):
    """
    Initializes and returns the HuggingFace embeddings model.
    """
    encode_kwargs = {'normalize_embeddings': True} # set True to compute cosine similarity
    embeddings = HuggingFaceEmbeddings(
        model_name=model_name,
        model_kwargs={'device': 'cpu'}, # Use 'cuda' if GPU is available
        encode_kwargs=encode_kwargs
    )
    return embeddings
