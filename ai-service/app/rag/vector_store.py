from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec
import os
import time

def get_pinecone_client():
    api_key = os.getenv("PINECONE_API_KEY")
    if not api_key:
        raise ValueError("PINECONE_API_KEY is missing from environment variables.")
    return Pinecone(api_key=api_key)

def create_vector_store(chunks, embeddings, persist_directory=None, collection_name="eduvix-index"):
    """
    Creates or updates a Pinecone vector store from document chunks.
    Note: collection_name here maps to Pinecone index name.
    """
    index_name = os.getenv("PINECONE_INDEX_NAME", "eduvix")
    pc = get_pinecone_client()

    # Create index if it doesn't exist
    if index_name not in pc.list_indexes().names():
        pc.create_index(
            name=index_name,
            dimension=384, # Matches BAAI/bge-small-en-v1.5
            metric='cosine',
            spec=ServerlessSpec(
                cloud='aws',
                region='us-east-1'
            )
        )
        # Wait for index to be ready
        while not pc.describe_index(index_name).status['ready']:
            time.sleep(1)

    # Note: Pinecone uses 'namespace' for data isolation instead of 'collections'
    # We will use the collection_name (which is user_id) as the namespace
    vector_store = PineconeVectorStore.from_documents(
        documents=chunks,
        embedding=embeddings,
        index_name=index_name,
        namespace=collection_name
    )
    return vector_store

def load_vector_store(embeddings, persist_directory=None, collection_name="eduvix-index"):
    """
    Loads an existing Pinecone vector store using a namespace.
    """
    index_name = os.getenv("PINECONE_INDEX_NAME", "eduvix")
    
    # We check if index exists, but we don't necessarily need to create it here
    # as the create_vector_store handles it.
    
    vector_store = PineconeVectorStore(
        index_name=index_name,
        embedding=embeddings,
        namespace=collection_name
    )
    return vector_store
