import os
import json
from groq import Groq

# Optional imports for local and AWS
try:
    import ollama
    OLLAMA_AVAILABLE = True
except ImportError:
    OLLAMA_AVAILABLE = False

try:
    import boto3
    BOTO3_AVAILABLE = True
except ImportError:
    BOTO3_AVAILABLE = False

class LLMClient:
    def __init__(self):
        self.provider = os.getenv("LLM_PROVIDER", "ollama").lower()
        self.model = os.getenv("LLM_MODEL", "llama3")
        self.aws_region = os.getenv("AWS_REGION", "us-east-1")
        
        if self.provider == "groq":
            api_key = os.getenv("GROQ_API_KEY")
            if not api_key:
                print("ERROR: GROQ_API_KEY is missing!")
            else:
                self.client = Groq(api_key=api_key)
            if self.model == "llama3" or not self.model:
                self.model = "llama3-8b-8192"
        elif self.provider == "bedrock":
            if not BOTO3_AVAILABLE:
                print("ERROR: boto3 library not found but provider is set to 'bedrock'")
            else:
                self.bedrock_runtime = boto3.client(
                    service_name='bedrock-runtime',
                    region_name=self.aws_region
                )
            if self.model == "llama3" or not self.model:
                self.model = "meta.llama3-8b-instruct-v1:0"
        elif self.provider == "ollama":
            if not OLLAMA_AVAILABLE:
                print("WARNING: ollama library not found but provider is set to 'ollama'")

    def chat(self, messages):
        if self.provider == "groq":
            if not hasattr(self, 'client'):
                raise ValueError("GROQ_API_KEY is missing.")
            try:
                response = self.client.chat.completions.create(
                    model=self.model,
                    messages=messages,
                )
                return {"message": {"content": response.choices[0].message.content}}
            except Exception as e:
                raise RuntimeError(f"Groq API Error: {str(e)}")
        
        elif self.provider == "bedrock":
            if not hasattr(self, 'bedrock_runtime'):
                raise ValueError("Bedrock client not initialized.")
            
            try:
                # Format prompt for Llama 3 on Bedrock
                prompt = ""
                for msg in messages:
                    if msg['role'] == 'system':
                        prompt += f"<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{msg['content']}<|eot_id|>"
                    elif msg['role'] == 'user':
                        prompt += f"<|start_header_id|>user<|end_header_id|>\n\n{msg['content']}<|eot_id|>"
                    elif msg['role'] == 'assistant':
                        prompt += f"<|start_header_id|>assistant<|end_header_id|>\n\n{msg['content']}<|eot_id|>"
                
                prompt += "<|start_header_id|>assistant<|end_header_id|>\n\n"

                body = json.dumps({
                    "prompt": prompt,
                    "max_gen_len": 1024,
                    "temperature": 0.5,
                    "top_p": 0.9,
                })

                response = self.bedrock_runtime.invoke_model(
                    body=body,
                    modelId=self.model,
                    accept='application/json',
                    contentType='application/json'
                )

                response_body = json.loads(response.get('body').read())
                return {"message": {"content": response_body.get('generation')}}
            except Exception as e:
                raise RuntimeError(f"Bedrock API Error: {str(e)}")

        else:
            # Default to Ollama
            if not OLLAMA_AVAILABLE:
                raise RuntimeError("Ollama library not installed. Please set LLM_PROVIDER=groq or bedrock.")
            return ollama.chat(model=self.model, messages=messages)

    def generate(self, prompt):
        if self.provider == "groq":
            if not hasattr(self, 'client'):
                raise ValueError("GROQ_API_KEY is missing.")
            try:
                response = self.client.chat.completions.create(
                    model=self.model,
                    messages=[{"role": "user", "content": prompt}],
                )
                return {"response": response.choices[0].message.content}
            except Exception as e:
                raise RuntimeError(f"Groq API Error: {str(e)}")
        
        elif self.provider == "bedrock":
            if not hasattr(self, 'bedrock_runtime'):
                raise ValueError("Bedrock client not initialized.")
            
            try:
                formatted_prompt = f"<|begin_of_text|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n"
                
                body = json.dumps({
                    "prompt": formatted_prompt,
                    "max_gen_len": 1024,
                    "temperature": 0.5,
                    "top_p": 0.9,
                })

                response = self.bedrock_runtime.invoke_model(
                    body=body,
                    modelId=self.model,
                    accept='application/json',
                    contentType='application/json'
                )

                response_body = json.loads(response.get('body').read())
                return {"response": response_body.get('generation')}
            except Exception as e:
                raise RuntimeError(f"Bedrock API Error: {str(e)}")

        else:
            # Default to Ollama
            if not OLLAMA_AVAILABLE:
                raise RuntimeError("Ollama library not installed. Please set LLM_PROVIDER=groq or bedrock.")
            return ollama.generate(model=self.model, prompt=prompt)

llm_client = LLMClient()
