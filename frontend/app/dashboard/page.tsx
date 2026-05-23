"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { FileUploader } from "@/components/dashboard/FileUploader";
import Link from "next/link";
import { 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Award,
  Zap,
  CheckCircle2,
  AlertCircle,
  Brain,
  FileText,
  Rocket,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/services/api";

interface DashboardData {
  user: {
    name: string;
    grade: string;
  };
  stats: {
    dailyProgress: string;
    studyTime: string;
    topicsMastered: number;
    avgScore: string;
  };
  recentMaterials: any[];
  recentQuizzes: any[];
  weakTopics: { topic: string; count: number }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchData = async () => {
      try {
        const res = await api.get<DashboardData>("/dashboard");
        setData(res);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!data) return null;

  const stats = [
    { label: "Daily Progress", value: data.stats.dailyProgress, icon: TrendingUp, color: "text-green-500", bg: "bg-green-50" },
    { label: "Study Time", value: data.stats.studyTime, icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Topics Mastered", value: data.stats.topicsMastered.toString(), icon: CheckCircle2, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Avg Score", value: data.stats.avgScore, icon: Award, color: "text-orange-500", bg: "bg-orange-50" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            Hey {data.user.name ? data.user.name.split(' ')[0] : 'Explorer'}! 👋
          </h1>
          <p className="text-gray-500 mt-1">Ready to learn something new today?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="flex items-center gap-4">
                <div className={`${stat.bg} p-3 rounded-2xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Adaptive Quiz",
              desc: "Personalized questions from your PDFs",
              icon: Rocket,
              color: "blue",
              bg: "bg-blue-50",
              text: "text-blue-600",
              href: "/quiz"
            },
            {
              title: "Spelling Fun",
              desc: "Master tricky words in science & history",
              icon: BookOpen,
              color: "purple",
              bg: "bg-purple-50",
              text: "text-purple-600",
              href: "/spelling"
            },
            {
              title: "Your Progress",
              desc: "See how much you've learned",
              icon: Award,
              color: "green",
              bg: "bg-green-50",
              text: "text-green-600",
              href: "/analytics"
            }
          ].map((action, i) => (
            <Link key={i} href={action.href}>
              <Card className="p-6 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group border-transparent hover:border-gray-100">
                <div className={`${action.bg} w-14 h-14 rounded-2xl flex items-center justify-center ${action.text} mb-6 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-7 h-7" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-500">{action.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Recent Materials</h2>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View all</button>
              </div>
              
              <div className="space-y-4 mb-6">
                {data.recentMaterials.length > 0 ? (
                  data.recentMaterials.map((material, i) => (
                    <Card key={i} className="flex items-center justify-between group cursor-pointer border-blue-50">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {material.subject}
                          </h4>
                          <p className="text-sm text-gray-500">{material.filename}</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-gray-400">
                        {new Date(material.createdAt).toLocaleDateString()}
                      </span>
                    </Card>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">No materials uploaded yet.</p>
                )}
              </div>
              
              <FileUploader />
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Quiz Activity</h2>
              <div className="space-y-4">
                {data.recentQuizzes.length > 0 ? (
                  data.recentQuizzes.map((quiz, i) => (
                    <Card key={i} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="bg-orange-100 p-3 rounded-2xl text-orange-600">
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {quiz.subject} Quiz
                          </h4>
                          <p className="text-sm text-gray-500">Score: {quiz.score}% • {new Date(quiz.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Link href={`/review/${quiz._id}`}>
                        <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-md">
                          Review
                        </button>
                      </Link>
                    </Card>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">No quizzes taken yet.</p>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-none">
              <div className="flex flex-col h-full">
                <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Tutor Status</h3>
                <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                  Your personal AI Tutor is online and ready to help you with your homework!
                </p>
                <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-2xl hover:bg-blue-50 transition-colors">
                  Ask a Question
                </button>
              </div>
            </Card>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Focus Topics</h2>
              <div className="space-y-4">
                {data.weakTopics.length > 0 ? (
                  data.weakTopics.map((item, i) => (
                    <Card key={i} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-gray-400" />
                          <span className="font-bold text-gray-900 text-sm">{item.topic}</span>
                        </div>
                        <span className="text-xs font-bold text-gray-500">{item.count} misses</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(item.count * 20, 100)}%` }}
                          className="h-full bg-orange-500"
                        />
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">Extra practice recommended</p>
                    </Card>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">Keep learning to see focus topics!</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

