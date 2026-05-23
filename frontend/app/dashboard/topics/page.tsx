"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { api } from "@/services/api";
import { BookOpen, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function TopicsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.getPerformance();
        setProfile(data.profile);
      } catch (err) {
        console.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Learning Topics</h1>
          <p className="text-gray-500 mt-1">See which topics you've mastered and where you can grow.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <AlertCircle className="text-orange-500 w-6 h-6" />
                Focus Areas
              </h2>
              <div className="space-y-4">
                {profile?.weakTopics?.length > 0 ? (
                  profile.weakTopics.map((item: any, i: number) => (
                    <Card key={i} className="space-y-4 border-orange-100">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 text-lg">{item.topic}</span>
                        <span className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                          Needs Practice
                        </span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(item.score * 10, 100)}%` }}
                          className="h-full bg-orange-500"
                        />
                      </div>
                      <p className="text-sm text-gray-500 italic">
                        You've missed {item.score} questions in this topic.
                      </p>
                    </Card>
                  ))
                ) : (
                  <Card className="p-8 text-center text-gray-500">
                    Take more quizzes to identify your focus areas!
                  </Card>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-green-500 w-6 h-6" />
                Mastered Topics
              </h2>
              <div className="space-y-4">
                {profile?.strongTopics?.length > 0 ? (
                  profile.strongTopics.map((topic: string, i: number) => (
                    <Card key={i} className="flex items-center gap-4 border-green-100">
                      <div className="bg-green-100 p-3 rounded-2xl text-green-600">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-gray-900 text-lg">{topic}</span>
                    </Card>
                  ))
                ) : (
                  <Card className="p-8 text-center text-gray-500">
                    No topics mastered yet. Keep up the great work!
                  </Card>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
