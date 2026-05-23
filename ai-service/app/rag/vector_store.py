from langchain_community.vectorstores import Chroma
import os

def create_vector_store(chunks, embeddings, persist_directory="./chroma_db"):
    """
    Creates a Chroma vector store from document chunks and persists it.
    """
    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=persist_directory
    )
    return vector_store

def load_vector_store(embeddings, persist_directory="./chroma_db"):
    """
    Loads an existing Chroma vector store.
    """
    if not os.path.exists(persist_directory):
        return None
        
    vector_store = Chroma(
        persist_directory=persist_directory,
        embedding_function=embeddings
    )
    return vector_store
