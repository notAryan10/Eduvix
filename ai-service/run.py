import os
import uvicorn
from app.main import app

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    # We use 0.0.0.0 to bind to all interfaces for cloud deployment
    uvicorn.run(app, host="0.0.0.0", port=port)
