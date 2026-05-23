import ollama
import json
import re
from app.rag.rag_pipeline import rag_pipeline

class SpellingGenerator:
    def __init__(self, model_name="llama3"):
        self.model_name = model_name

    def generate_spelling_words(self, learning_profile, num_words=5):
        """
        Generates spelling words based on weak topics and document context.
        """
        try:
            # 1. Get topics to focus on
            weak_topics = [t["topic"] for t in learning_profile.get("weakTopics", [])[:2]]
            subject = weak_topics[0] if weak_topics else "General Knowledge"
            
            # 2. Retrieve context
            retrieval_result = rag_pipeline.answer_question(f"Important vocabulary and complex words in {subject}")
            context = retrieval_result.get("context", "")
            
            # 3. Prepare Prompt
            prompt_text = f"""
            You are a helpful teacher. Based on the context below, identify {num_words} challenging spelling words for a 5th grade student.
            Focus on words related to {subject}.
            
            CONTEXT:
            {context}
            
            REQUIREMENTS:
            - Exactly {num_words} words.
            - Respond ONLY with a valid JSON array of strings.
            - Format: ["Word1", "Word2", "Word3", "Word4", "Word5"]
            """
            
            # 4. Call Ollama
            response = ollama.generate(
                model=self.model_name,
                prompt=prompt_text,
                stream=False
            )
            
            raw_content = response['response']
            
            # Robust JSON Extraction
            json_match = re.search(r'\[\s*".*"\s*\]', raw_content, re.DOTALL)
            if json_match:
                words = json.loads(json_match.group())
            else:
                cleaned = raw_content.replace("```json", "").replace("```", "").strip()
                words = json.loads(cleaned)
            
            return words[:num_words]
            
        except Exception as e:
            print(f"Spelling Generator Error: {str(e)}")
            # Fallback words if AI fails
            return ["Photosynthesis", "Atmosphere", "Metamorphosis", "Ecosystem", "Velocity"]

spelling_generator = SpellingGenerator()
