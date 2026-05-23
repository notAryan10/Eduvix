"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Rocket, Brain } from "lucide-react";
import { Card } from "../ui/Card";

interface AICompanionCardProps {
  message: string;
  mood?: "happy" | "encouraging" | "excited" | "thinking";
}

export function AICompanionCard({ message, mood = "happy" }: AICompanionCardProps) {
  const icons = {
    happy: <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />,
    encouraging: <Sparkles className="w-8 h-8 text-yellow-500" />,
    excited: <Rocket className="w-8 h-8 text-blue-500" />,
    thinking: <Brain className="w-8 h-8 text-purple-500" />,
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-none shadow-lg overflow-hidden relative">
      <div className="flex gap-6 items-center">
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            rotate: mood === "excited" ? [0, 5, -5, 0] : 0
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="bg-white p-4 rounded-3xl shadow-sm border border-blue-100 flex-shrink-0"
        >
          {icons[mood]}
        </motion.div>
        <div className="relative">
          <div className="absolute -left-2 top-4 w-4 h-4 bg-white border-l border-t border-blue-100 rotate-[-45deg] z-0 hidden md:block" />
          <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm relative z-10">
            <p className="text-gray-700 text-sm font-medium leading-relaxed italic">
              "{message}"
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 p-2 opacity-10">
        <Sparkles className="w-20 h-24 text-blue-900" />
      </div>
    </Card>
  );
}
