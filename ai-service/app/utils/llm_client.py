import os
import ollama
from groq import Groq

class LLMClient:
    def __init__(self):
        self.provider = os.getenv("LLM_PROVIDER", "ollama").lower()
        self.model = os.getenv("LLM_MODEL", "llama3")
        
        if self.provider == "groq":
            api_key = os.getenv("GROQ_API_KEY")
            if not api_key:
                raise ValueError("GROQ_API_KEY is required for groq provider")
            self.client = Groq(api_key=api_key)
            self.model = os.getenv("LLM_MODEL", "llama3-8b-8192")

    def chat(self, messages):
        if self.provider == "groq":
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
            )
            return {"message": {"content": response.choices[0].message.content}}
        else:
            # Default to Ollama
            return ollama.chat(model=self.model, messages=messages)

    def generate(self, prompt):
        if self.provider == "groq":
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
            )
            return {"response": response.choices[0].message.content}
        else:
            # Default to Ollama
            return ollama.generate(model=self.model, prompt=prompt)

llm_client = LLMClient()
