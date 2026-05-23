"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { TutorChat } from "@/components/tutor/TutorChat";
import { Brain, MessageSquare, Info, Volume2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function TutorPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chat Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900">AI Tutor</h1>
              <p className="text-gray-500 mt-1">Chat with your personalized study companion.</p>
            </div>
            <Link href="/tutor/voice">
              <Button variant="secondary" className="h-12 flex items-center gap-2 group">
                <Volume2 className="w-5 h-5 group-hover:animate-pulse" />
                Switch to Voice Mode
              </Button>
            </Link>
          </div>
          <TutorChat />
        </div>

        {/* Sidebar Info Area */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500 p-2 rounded-xl text-white">
                <Info className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900">How to use</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Ask questions about your uploaded PDFs.",
                "Get help with homework or tricky concepts.",
                "Your tutor remembers your weak topics to help you better.",
                "Try asking 'Explain photosynthesis simply'."
              ].map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-500 p-2 rounded-xl text-white">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900">Recent Sessions</h3>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-500 italic">No recent sessions yet. Start a new chat!</p>
            </div>
          </Card>

          <Card className="p-6 border-dashed border-2 border-gray-200 bg-gray-50/50">
            <div className="text-center py-4">
              <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-xs font-medium text-gray-400">
                Your feedback helps the AI Tutor learn and improve.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
