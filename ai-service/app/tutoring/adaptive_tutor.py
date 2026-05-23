import ollama
from app.rag.rag_pipeline import rag_pipeline
from app.tutoring.teaching_style_engine import teaching_style_engine

class AdaptiveTutor:
    def __init__(self, model_name="llama3"):
        self.model_name = model_name

    def generate_response(self, query, learning_profile, session_history=None):
        """
        Generates a personalized tutoring response based on student's profile.
        """
        try:
            # 1. Retrieve context using RAG
            user_id = str(learning_profile.get("userId", "default"))
            retrieval_result = rag_pipeline.answer_question(query, user_id)
            context = retrieval_result.get("context", "")
            
            # 2. Get teaching style and difficulty
            style = learning_profile.get("preferredTeachingStyle", "conversational")
            difficulty = learning_profile.get("preferredDifficulty", "medium")
            reading_level = learning_profile.get("readingLevel", "Beginner")
            
            style_prompt = teaching_style_engine.get_prompt_modifier(style)
            
            # 3. Prepare Prompt
            system_prompt = f"""
            You are a helpful and kind AI Tutor for a child. 
            Student Grade/Reading Level: {reading_level}
            Teaching Style: {style}
            Difficulty Level: {difficulty}
            
            INSTRUCTIONS:
            - Use the provided CONTEXT to answer.
            - {style_prompt}
            - Keep language simple and appropriate for a child.
            - If it's a weak topic for the student, explain more slowly and use simpler examples.
            - If the student is struggling, offer encouragement.
            """
            
            prompt_text = f"CONTEXT:\n{context}\n\nUSER QUESTION: {query}"
            
            messages = [{"role": "system", "content": system_prompt}]
            if session_history:
                messages.extend(session_history)
            messages.append({"role": "user", "content": prompt_text})
            
            # 4. Call Ollama
            response = ollama.chat(
                model=self.model_name,
                messages=messages,
                stream=False
            )
            
            return {
                "answer": response['message']['content'],
                "context_used": True if context else False,
                "style_applied": style
            }
            
        except Exception as e:
            print(f"Adaptive Tutor Error: {str(e)}")
            raise e

adaptive_tutor = AdaptiveTutor()
