from app.rag.pdf_loader import load_pdf
from app.rag.text_splitter import split_text
from app.rag.embeddings import get_embeddings_model
from app.rag.vector_store import create_vector_store, load_vector_store
from app.rag.retriever import get_retriever

class RAGPipeline:
    def __init__(self, persist_directory="./chroma_db"):
        self.persist_directory = persist_directory
        self.embeddings = get_embeddings_model()

    def process_new_pdf(self, file_path, user_id="default"):
        """
        Processes a new PDF, creates embeddings, and updates the vector store for a specific user.
        """
        documents = load_pdf(file_path)
        chunks = split_text(documents)
        
        # Use user_id as collection name to isolate data
        collection_name = f"user_{user_id}"
        
        create_vector_store(chunks, self.embeddings, self.persist_directory, collection_name)
        return {"status": "success", "chunks_processed": len(chunks)}

    def answer_question(self, query, user_id="default"):
        """
        Retrieves context and prepares an answer (ready for LLM integration).
        """
        collection_name = f"user_{user_id}"
        vector_store = load_vector_store(self.embeddings, self.persist_directory, collection_name)

        if not vector_store:
            return {"error": "No documents processed yet for this user."}
            
        retriever = get_retriever(vector_store)
        docs = retriever.invoke(query)
        
        # Filter out empty or very short docs
        docs = [doc for doc in docs if len(doc.page_content.strip()) > 10]
        
        context = "\n\n".join([doc.page_content for doc in docs])
        
        return {
            "answer": "Context retrieved successfully.",
            "context": context,
            "sources": [doc.metadata.get("source", "Unknown") for doc in docs]
        }

# Global instance
rag_pipeline = RAGPipeline()
