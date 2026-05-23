import json
import re
from app.rag.rag_pipeline import rag_pipeline
from app.utils.llm_client import llm_client

class QuestionGenerator:
    def __init__(self, model_name="llama3"):
        self.model_name = model_name

    def generate_quiz(self, subject, difficulty="medium", num_questions=5, user_id="default"):
        """
        Generates a quiz based on the subject using the LLM client.
        """
        try:
            # 1. Retrieve context using RAG
            print(f"\n--- AI SERVICE: Starting Quiz Gen for {subject} (User: {user_id}) ---")
            retrieval_result = rag_pipeline.answer_question(f"Educational content about {subject}", user_id)
            context = retrieval_result.get("context", "")
            
            if not context:
                print("DEBUG: Specific search failed, trying broad search...")
                retrieval_result = rag_pipeline.answer_question("Key educational facts in this document", user_id)
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
            
            # 3. Call LLM Client
            print("DEBUG: Sending request to LLM Client...")
            response = llm_client.generate(prompt=prompt_text)
            
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
            error_msg = f"LLM Error: {str(e)}"
            print(f"ERROR: {error_msg}")
            raise Exception(error_msg)

question_generator = QuestionGenerator()
