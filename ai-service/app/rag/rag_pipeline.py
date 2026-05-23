from app.rag.pdf_loader import load_pdf
from app.rag.text_splitter import split_text
from app.rag.embeddings import get_embeddings_model
from app.rag.vector_store import create_vector_store, load_vector_store
from app.rag.retriever import get_retriever

class RAGPipeline:
    def __init__(self, persist_directory="./chroma_db"):
        self.persist_directory = persist_directory
        self.embeddings = get_embeddings_model()
        self.vector_store = load_vector_store(self.embeddings, self.persist_directory)

    def process_new_pdf(self, file_path):
        """
        Processes a new PDF, creates embeddings, and updates the vector store.
        """
        documents = load_pdf(file_path)
        chunks = split_text(documents)
        self.vector_store = create_vector_store(chunks, self.embeddings, self.persist_directory)
        return {"status": "success", "chunks_processed": len(chunks)}

    def answer_question(self, query):
        """
        Retrieves context and prepares an answer (ready for LLM integration).
        For now, returns retrieved context.
        """
        if not self.vector_store:
            return {"error": "No documents processed yet."}
            
        retriever = get_retriever(self.vector_store)
        docs = retriever.invoke(query)
        
        # In Phase 2, we return the context. Phase 3 will add the LLM generation.
        context = "\n\n".join([doc.page_content for doc in docs])
        
        return {
            "answer": "This is a context-aware answer placeholder. Phase 3 will integrate the LLM.",
            "context": context,
            "sources": [doc.metadata.get("source", "Unknown") for doc in docs]
        }

# Global instance
rag_pipeline = RAGPipeline()
