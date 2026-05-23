def get_retriever(vector_store, search_type="similarity", k=4):
    """
    Returns a retriever from the vector store.
    """
    return vector_store.as_retriever(search_type=search_type, search_kwargs={"k": k})

def retrieve_context(retriever, query):
    """
    Retrieves relevant documents for a given query.
    """
    return retriever.get_relevant_documents(query)
