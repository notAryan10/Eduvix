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
    throw new Error(data.message || "Something went wrong");
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
  generateQuiz: (subject: string, difficulty: string) => 
    api.post("/quiz/generate", { subject, difficulty }),
  
  submitQuiz: (quizData: any) => 
    api.post("/quiz/submit", quizData),
    
  checkSpelling: (spellingData: any) => 
    api.post("/spelling/check", spellingData),
    
  getSpellingWords: () => 
    api.get("/spelling/words"),
    
  getPerformance: () => 
    api.get("/analytics/performance"),

  getQuizAttempt: (id: string) => 
    api.get(`/quiz/attempt/${id}`),

  // Phase 4 Additions
  tutorChat: (query: string, sessionId?: string, topic?: string) => 
    api.post("/tutor/chat", { query, sessionId, topic }),
  
  getRevisionPlan: () => 
    api.get("/revision/plan"),
    
  getLearningProfile: () => 
    api.get("/learning/profile"),
    
  updateLearningPreferences: (preferences: any) => 
    api.put("/learning/preferences", preferences),
};
