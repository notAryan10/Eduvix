"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/services/api";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Brain, Rocket, CheckCircle, XCircle } from "lucide-react";

export default function QuizPage() {
  const searchParams = useSearchParams();
  const [subject, setSubject] = useState(searchParams.get("subject") || "");
  const [quiz, setQuiz] = useState<any[] | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const s = searchParams.get("subject");
    if (s) setSubject(s);
  }, [searchParams]);

  const startQuiz = async () => {
    if (!subject) return;
    setLoading(true);
    try {
      const data = await api.generateQuiz(subject, "medium");
      setQuiz(data as any[]);
    } catch (err: any) {
      alert(err.message || "Failed to generate quiz. Have you uploaded a PDF?");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === quiz![currentStep].correctAnswer;
    const newAnswers = [...answers, { 
      question: quiz![currentStep].question,
      userAnswer: answer,
      correctAnswer: quiz![currentStep].correctAnswer,
      isCorrect,
      explanation: quiz![currentStep].explanation
    }];
    setAnswers(newAnswers);

    if (currentStep < quiz!.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setFinished(true);
      submitResults(newAnswers);
    }
  };

  const submitResults = async (finalAnswers: any[]) => {
    const score = Math.round((finalAnswers.filter(a => a.isCorrect).length / quiz!.length) * 100);
    try {
      await api.submitQuiz({
        subject,
        questions: finalAnswers,
        score,
        difficulty: "medium",
        timeTaken: 120 // mock
      });
    } catch (err) {
      console.error("Failed to save results");
    }
  };

  if (!quiz) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4">
        <div className="text-center mb-10">
          <Brain className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">What do you want to study today?</h1>
          <p className="text-gray-500">I'll create a fun quiz from your textbooks!</p>
        </div>
        <Card className="p-8">
          <input 
            className="w-full p-4 border rounded-xl mb-4 text-gray-900 font-medium placeholder:text-gray-300"
            placeholder="e.g. Science Chapter 1, History of India"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <Button 
            className="w-full h-14 text-lg" 
            onClick={startQuiz}
            disabled={loading || !subject}
          >
            {loading ? "Generating Quiz..." : "Create Quiz"}
          </Button>
        </Card>
      </div>
    );
  }

  if (finished) {
    const score = Math.round((answers.filter(a => a.isCorrect).length / quiz.length) * 100);
    return (
      <div className="max-w-2xl mx-auto py-20 px-4">
        <Card className="p-10 text-center bg-white shadow-2xl">
          <Rocket className="w-20 h-20 text-orange-500 mx-auto mb-6" />
          <h2 className="text-4xl font-black mb-2 text-gray-900">Quiz Complete!</h2>
          <p className="text-2xl text-blue-600 font-black mb-10">Your Score: {score}%</p>
          
          <div className="text-left space-y-6 mb-10">
            {answers.map((a, i) => (
              <div key={i} className={`p-6 rounded-2xl border-2 ${a.isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                <p className="font-bold text-gray-900 text-lg mb-3">{a.question}</p>
                <div className="flex items-center gap-3 py-2 border-y border-black/5 mb-3">
                  {a.isCorrect ? (
                    <div className="bg-green-500 p-1 rounded-full"><CheckCircle className="text-white w-5 h-5" /></div>
                  ) : (
                    <div className="bg-red-500 p-1 rounded-full"><XCircle className="text-white w-5 h-5" /></div>
                  )}
                  <span className={`font-bold ${a.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {a.userAnswer}
                  </span>
                </div>
                {!a.isCorrect && (
                  <p className="text-sm font-bold text-gray-900 mb-2">
                    Correct Answer: <span className="text-green-600">{a.correctAnswer}</span>
                  </p>
                )}
                <div className="mt-3 p-3 bg-white/50 rounded-xl">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-bold">Teacher's Note:</span> {a.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full h-14 text-lg font-bold shadow-xl" 
            onClick={() => window.location.href = "/dashboard"}
          >
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const q = quiz[currentStep];

  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <div className="flex justify-between items-center mb-8">
        <span className="text-sm font-bold text-gray-400">Question {currentStep + 1} of {quiz.length}</span>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 transition-all" style={{ width: `${((currentStep + 1) / quiz.length) * 100}%` }} />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-10">{q.question}</h2>
      
      <div className="grid gap-4">
        {q.options.map((option: string, i: number) => (
          <button
            key={i}
            className="w-full p-6 text-left border-2 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all font-medium"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
