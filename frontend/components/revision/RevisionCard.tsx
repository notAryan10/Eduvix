"use client";

import React from "react";
import { Card } from "../ui/Card";
import { AlertCircle, CheckCircle2, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface RevisionTopic {
  topic: string;
  priority: "high" | "medium" | "low";
  reason: string;
}

interface RevisionCardProps {
  topic: RevisionTopic;
  onStart: (topic: string) => void;
}

export function RevisionCard({ topic, onStart }: RevisionCardProps) {
  const priorityStyles = {
    high: "bg-red-50 text-red-600 border-red-100",
    medium: "bg-orange-50 text-orange-600 border-orange-100",
    low: "bg-green-50 text-green-600 border-green-100",
  };

  const priorityIcons = {
    high: AlertCircle,
    medium: Zap,
    low: CheckCircle2,
  };

  const Icon = priorityIcons[topic.priority];

  return (
    <Card className={`p-6 border-2 transition-all hover:translate-x-1 ${priorityStyles[topic.priority]}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className={`p-3 rounded-2xl ${topic.priority === 'high' ? 'bg-red-100' : topic.priority === 'medium' ? 'bg-orange-100' : 'bg-green-100'}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-1">{topic.topic}</h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {topic.reason}
            </p>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                topic.priority === 'high' ? 'bg-red-200 text-red-700' : 
                topic.priority === 'medium' ? 'bg-orange-200 text-orange-700' : 
                'bg-green-200 text-green-700'
              }`}>
                {topic.priority} Priority
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => onStart(topic.topic)}
          className="bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition-all text-gray-900 hover:text-blue-600"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </Card>
  );
}
