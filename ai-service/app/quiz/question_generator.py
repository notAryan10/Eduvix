import json
import re
import ollama
from app.rag.rag_pipeline import rag_pipeline

class QuestionGenerator:
    def __init__(self, model_name="llama3"):
        self.model_name = model_name

    def generate_quiz(self, subject, difficulty="medium", num_questions=5):
        """
        Generates a quiz based on the subject using the official Ollama library.
        """
        try:
            # 1. Retrieve context using RAG
            print(f"\n--- AI SERVICE: Starting Quiz Gen for {subject} ---")
            retrieval_result = rag_pipeline.answer_question(f"Educational content about {subject}")
            context = retrieval_result.get("context", "")
            
            if not context:
                print("DEBUG: Specific search failed, trying broad search...")
                retrieval_result = rag_pipeline.answer_question("Key educational facts in this document")
                context = retrieval_result.get("context", "")

            if not context:
                return {"error": f"No information found for '{subject}'."}

            # 2. Prepare Prompt
            prompt_text = f"""
            You are a helpful teacher. Based on the context below, create a {num_questions} question quiz for a 5th grade student.
            
            CONTEXT:
            {context}
            
            REQUIREMENTS:
            - Exactly {num_questions} questions.
            - Provide 4 options for each MCQ.
            - Respond ONLY with a valid JSON array of objects.
            - Format: [{{ "question": "...", "type": "MCQ", "options": ["...", "...", "...", "..."], "correctAnswer": "...", "explanation": "..." }}]
            """
            
            # 3. Call Official Ollama Library
            print(f"DEBUG: Sending request to Ollama ({self.model_name})...")
            response = ollama.generate(
                model=self.model_name,
                prompt=prompt_text,
                stream=False
            )
            
            raw_content = response['response']
            print(f"DEBUG: Raw response received ({len(raw_content)} chars).")

            # 4. Robust JSON Extraction
            json_match = re.search(r'\[\s*\{.*\}\s*\]', raw_content, re.DOTALL)
            if json_match:
                quiz_data = json.loads(json_match.group())
            else:
                cleaned = raw_content.replace("```json", "").replace("```", "").strip()
                quiz_data = json.loads(cleaned)
            
            print("--- AI SERVICE: Quiz Gen Successful ---\n")
            return quiz_data[:num_questions]
            
        except Exception as e:
            error_msg = f"Ollama Error: {str(e)}"
            print(f"ERROR: {error_msg}")
            # Try a quick fallback to 'llama3:latest' if the first one fails
            if "not found" in str(e).lower() and self.model_name == "llama3":
                print("DEBUG: llama3 not found, trying llama3:latest...")
                self.model_name = "llama3:latest"
                return self.generate_quiz(subject, difficulty, num_questions)
                
            raise Exception(error_msg)

question_generator = QuestionGenerator()

question_generator = QuestionGenerator()
