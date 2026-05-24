const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001/api";

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.error || data.message || "Something went wrong";
    throw new Error(errorMsg);
  }

  return data;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) => request<T>(endpoint, { ...options, method: "GET" }),
  post: <T>(endpoint: string, body: any, options?: RequestInit) => 
    request<T>(endpoint, { ...options, method: "POST", body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: any, options?: RequestInit) => 
    request<T>(endpoint, { ...options, method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(endpoint: string, options?: RequestInit) => request<T>(endpoint, { ...options, method: "DELETE" }),
  
  upload: async <T>(endpoint: string, file: File, subject: string): Promise<T> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("subject", subject);

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Upload failed");
    return data;
  },

  // Phase 3 Additions
  generateQuiz: (subject: string, difficulty: string): Promise<any> => 
    api.post("/quiz/generate", { subject, difficulty }),
  
  submitQuiz: (quizData: any): Promise<any> => 
    api.post("/quiz/submit", quizData),
    
  checkSpelling: (spellingData: any): Promise<any> => 
    api.post("/spelling/check", spellingData),
    
  getSpellingWords: (): Promise<any> => 
    api.get("/spelling/words"),
    
  getPerformance: (): Promise<any> => 
    api.get("/analytics/performance"),

  getQuizAttempt: (id: string): Promise<any> => 
    api.get(`/quiz/attempt/${id}`),

  // Phase 4 Additions
  tutorChat: (query: string, sessionId?: string, topic?: string): Promise<any> => 
    api.post("/tutor/chat", { query, sessionId, topic }),
  
  getRevisionPlan: (): Promise<any> => 
    api.get("/revision/plan"),
    
  getLearningProfile: (): Promise<any> => 
    api.get("/learning/profile"),
    
  updateLearningPreferences: (preferences: any): Promise<any> => 
    api.put("/learning/preferences", preferences),

  // Phase 5 Additions
  startVoiceSession: (topic: string): Promise<any> => 
    api.post("/voice/start-session", { topic }),
  
  updateVoiceSession: (sessionId: string, role: string, content: string): Promise<any> => 
    api.put(`/voice/session/${sessionId}`, { role, content }),

  getGamificationProfile: (): Promise<any> => 
    api.get("/gamification/profile"),
    
  getAchievements: (): Promise<any> => 
    api.get("/achievement"),
    
  unlockAchievement: (achievementName: string): Promise<any> => 
    api.post("/achievement/unlock", { achievementName }),

  addXP: (source: string): Promise<any> => 
    api.post("/gamification/add-xp", { source }),
};
