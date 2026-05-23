"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/services/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle, XCircle, ArrowLeft, Calendar, Target } from "lucide-react";
import Link from "next/link";

export default function ReviewPage() {
  const { id } = useParams();
  const [attempt, setAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        const data = await api.getQuizAttempt(id as string);
        setAttempt(data);
      } catch (err) {
        console.error("Failed to load review");
      } finally {
        setLoading(false);
      }
    };
    fetchAttempt();
  }, [id]);

  if (loading) return <div className="p-20 text-center font-bold">Loading your quiz summary...</div>;
  if (!attempt) return <div className="p-20 text-center font-bold">Quiz summary not found.</div>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <Link href="/dashboard" className="inline-flex items-center text-blue-600 font-bold mb-8 hover:underline gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <Card className="p-10 mb-10 bg-white shadow-xl border-b-8 border-blue-500">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">{attempt.subject} Quiz</h1>
            <div className="flex gap-4 text-gray-500 text-sm">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(attempt.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-1 capitalize"><Target className="w-4 h-4" /> {attempt.difficulty} Level</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Final Score</p>
            <p className="text-5xl font-black text-blue-600">{attempt.score}%</p>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Question Review</h2>
        {attempt.questions.map((q: any, i: number) => (
          <Card key={i} className={`p-6 border-2 ${q.isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
            <p className="font-bold text-gray-900 text-lg mb-4">{q.question}</p>
            
            <div className="flex items-center gap-3 py-3 border-y border-black/5 mb-4">
              {q.isCorrect ? (
                <div className="bg-green-500 p-1 rounded-full"><CheckCircle className="text-white w-5 h-5" /></div>
              ) : (
                <div className="bg-red-500 p-1 rounded-full"><XCircle className="text-white w-5 h-5" /></div>
              )}
              <span className={`font-bold ${q.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {q.userAnswer}
              </span>
            </div>

            {!q.isCorrect && (
              <p className="text-sm font-bold text-gray-900 mb-3">
                Correct Answer: <span className="text-green-600">{q.correctAnswer}</span>
              </p>
            )}

            <div className="p-4 bg-white/60 rounded-xl">
              <p className="text-sm text-gray-800 leading-relaxed">
                <span className="font-bold">Teacher's Note:</span> {q.explanation}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
