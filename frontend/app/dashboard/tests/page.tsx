"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { api } from "@/services/api";
import { FileText, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function TestsPage() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await api.getPerformance();
        setQuizzes(data.recentQuizzes || []);
      } catch (err) {
        console.error("Failed to fetch tests");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Your Tests</h1>
          <p className="text-gray-500 mt-1">Review your past performance and keep improving!</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            {quizzes.length > 0 ? (
              quizzes.map((quiz, i) => (
                <Card key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-100 p-3 rounded-2xl text-orange-600">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-lg">
                        {quiz.subject} Quiz
                      </h4>
                      <p className="text-sm text-gray-500">
                        Score: {quiz.score}% • {new Date(quiz.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Link href={`/review/${quiz._id}`}>
                    <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md flex items-center gap-2">
                      Review Results <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">You haven't taken any tests yet.</p>
                <Link href="/quiz">
                  <button className="mt-4 text-blue-600 font-bold hover:underline">Start your first quiz now!</button>
                </Link>
              </Card>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
