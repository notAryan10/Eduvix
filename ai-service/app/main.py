from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import rag_routes, quiz_routes, tutor_routes

app = FastAPI(title="AI Learning Companion - AI Service")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(rag_routes.router, prefix="/api/rag", tags=["RAG"])
app.include_router(quiz_routes.router, prefix="/api/quiz", tags=["Quiz"])
app.include_router(tutor_routes.router, prefix="/api/tutor", tags=["Tutor"])

@app.get("/")
async def root():
    return {"message": "AI Service is up and running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
