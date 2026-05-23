"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { RevisionCard } from "@/components/revision/RevisionCard";
import { Card } from "@/components/ui/Card";
import { api } from "@/services/api";
import { Sparkles, Calendar, Rocket, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function RevisionPage() {
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchPlan = async () => {
    setLoading(true);
    try {
      const res = await api.getRevisionPlan();
      setPlan(res);
    } catch (err) {
      console.error("Failed to fetch revision plan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  const startRevision = (topic: string) => {
    window.location.href = `/quiz?subject=${encodeURIComponent(topic)}`;
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 flex items-center gap-3">
              <Calendar className="w-10 h-10 text-blue-500" />
              Revision Planner
            </h1>
            <p className="text-gray-500 mt-2 text-lg">Your AI-powered study schedule for today.</p>
          </div>
          <Button onClick={fetchPlan} variant="outline" className="h-12 flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Plan
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : plan ? (
          <div className="space-y-8">
            <div className="bg-blue-600 rounded-[32px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-blue-200">
              <div className="space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm">
                  <Sparkles className="w-4 h-4" /> Daily Goal
                </div>
                <h2 className="text-3xl font-bold">Review {plan.topics.length} Key Topics</h2>
                <p className="text-blue-100 max-w-md">
                  We've analyzed your performance. Today's mission: Master these topics to level up!
                </p>
              </div>
              <Rocket className="w-24 h-24 text-blue-300 opacity-50 hidden md:block" />
            </div>

            <div className="grid gap-6">
              {plan.topics.map((topic: any, i: number) => (
                <RevisionCard key={i} topic={topic} onStart={startRevision} />
              ))}
            </div>
          </div>
        ) : (
          <Card className="p-20 text-center border-dashed border-2 bg-gray-50/30">
            <Sparkles className="w-16 h-16 text-blue-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Your Revision Plan is Ready to Grow!</h3>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Take a few quizzes first. Our AI will analyze your performance and build a personalized revision schedule just for you.
            </p>
            <Link href="/quiz">
              <Button className="mt-8 h-12">Start Your First Quiz</Button>
            </Link>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
