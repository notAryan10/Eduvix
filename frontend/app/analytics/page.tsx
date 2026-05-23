"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Card } from "@/components/ui/Card";
import { TrendingUp, Award, AlertTriangle, BookOpen } from "lucide-react";

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const result = await api.getPerformance();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="p-20 text-center font-bold">Loading your progress...</div>;
  if (!data) return <div className="p-20 text-center font-bold">No data found. Take a quiz to start!</div>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-black mb-10 flex items-center gap-3 text-gray-900">
        <TrendingUp className="w-10 h-10 text-blue-500" />
        Your Learning Journey
      </h1>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="p-8 border-b-4 border-blue-500 bg-white">
          <Award className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-lg text-gray-600 font-medium">Average Quiz Score</h3>
          <p className="text-4xl font-black text-gray-900">{data.quizAccuracy}%</p>
        </Card>
        
        <Card className="p-8 border-b-4 border-green-500 bg-white">
          <BookOpen className="w-12 h-12 text-green-500 mb-4" />
          <h3 className="text-lg text-gray-600 font-medium">Spelling Accuracy</h3>
          <p className="text-4xl font-black text-gray-900">{data.spellingAccuracy}%</p>
        </Card>

        <Card className="p-8 border-b-4 border-purple-500 bg-white">
          <TrendingUp className="w-12 h-12 text-purple-500 mb-4" />
          <h3 className="text-lg text-gray-600 font-medium">Difficulty Level</h3>
          <p className="text-4xl font-black capitalize text-gray-900">{data.profile.preferredDifficulty || 'Medium'}</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <AlertTriangle className="text-orange-500" />
            Areas to Practice
          </h2>
          <div className="space-y-4">
            {data.profile.weakTopics?.length > 0 ? (
              <div className="space-y-4">
                {data.profile.weakTopics.map((t: any, i: number) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <span className="font-bold text-gray-900">{t.topic}</span>
                    <span className="text-sm bg-orange-200 px-3 py-1 rounded-full font-bold text-orange-900">{t.score} mistakes</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Keep studying to identify areas for improvement!</p>
            )}
          </div>
        </section>

        <section className="bg-white p-8 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Recent Quizzes</h2>
          <div className="space-y-4">
            {data.recentQuizzes?.map((q: any, i: number) => (
              <div key={i} className="flex justify-between items-center p-4 border-b last:border-0">
                <div>
                  <p className="font-bold text-gray-900">{q.subject}</p>
                  <p className="text-xs text-gray-500 font-medium">{new Date(q.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`font-black text-xl ${q.score > 80 ? 'text-green-600' : 'text-blue-600'}`}>{q.score}%</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
