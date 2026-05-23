# Eduvix: The Intelligent AI Learning Companion

Eduvix is a comprehensive, personalized AI-powered learning ecosystem designed specifically for children. It transforms school materials into interactive adventures through advanced AI tutoring, immersive voice interaction, and a robust gamification system.

## 🚀 Key Features

### 1. **Personalized AI Tutoring**
- **RAG-Powered Intelligence**: Upload school textbooks (PDFs), and the AI will analyze and teach based on the actual curriculum.
- **Adaptive Teaching Styles**: Choose from 5 different teaching modes: *Storytelling, Visual, Step-by-Step, Conversational,* or *Hint-Based*.
- **Learning Memory**: The AI remembers your strong and weak topics to provide better help over time.

### 2. **Immersive Voice Experience**
- **Voice-to-Voice Interaction**: Talk directly to your AI Tutor using the built-in microphone.
- **Natural Explanations**: Hear lessons explained in a friendly, kid-appropriate voice.
- **Hands-Free Learning**: Ideal for oral quizzes and interactive spelling challenges.

### 3. **Smart Gamification (XP & Achievements)**
- **Level Up Your Brain**: Earn XP for every correct answer, finished quiz, or daily login.
- **Trophy Room**: Unlock special achievements like *Math Master*, *Spelling Champion*, and *Science Explorer*.
- **Daily Streaks**: Keep the flame alive by learning every day!

### 4. **Adaptive Learning Engine**
- **Dynamic Revision Planner**: Get a personalized "Daily Mission" focusing on topics you need to practice most.
- **Automatic Difficulty Adjustment**: The platform grows with you, making quizzes more challenging as you improve.
- **Mistake Analysis**: Tracks common mistake patterns to offer extra practice where it matters.

## 🛠️ Project Structure

- `frontend/`: Next.js 15 (App Router, TypeScript, TailwindCSS, Framer Motion)
- `backend/`: Express.js server (Node.js, MongoDB, JWT Auth, Multer)
- `ai-service/`: FastAPI AI core (Python, LangChain, ChromaDB, Ollama/Llama 3)

## ⚙️ Setup Instructions

### AI Service (Required for Tutoring & Quizzes)

1. **Install Ollama**: Ensure [Ollama](https://ollama.com/) is installed and running with `llama3` downloaded.
2. Navigate to the `ai-service` directory:
   ```bash
   cd ai-service
   ```
3. Create a virtual environment and install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
4. Start the AI core:
   ```bash
   python3 run.py
   ```

### Backend (Orchestration & Data)

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (see `.env.example`):
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   AI_SERVICE_URL=http://localhost:8000
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend (User Interface)

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5001/api
   ```
4. Start the learning adventure:
   ```bash
   npm run dev
   ```

## 🏆 Development Phases
- **Phase 1-3:** Core Infrastructure, RAG integration, and UI Foundations.
- **Phase 4:** Adaptive Intelligence & Learning Memory.
- **Phase 5:** Voice AI, Gamification (XP/Achievements), and Advanced Analytics.

---
*Built with ❤️ to make learning fun for the next generation of explorers.*
