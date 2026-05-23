"use client";

import React from "react";
import { Zap, Shield, Rocket } from "lucide-react";

interface AdaptiveDifficultyBadgeProps {
  difficulty: "easy" | "medium" | "hard";
}

export function AdaptiveDifficultyBadge({ difficulty }: AdaptiveDifficultyBadgeProps) {
  const configs = {
    easy: {
      label: "Explorer",
      icon: Shield,
      color: "bg-green-100 text-green-700 border-green-200",
      description: "Building strong foundations"
    },
    medium: {
      label: "Achiever",
      icon: Zap,
      color: "bg-blue-100 text-blue-700 border-blue-200",
      description: "Mastering new challenges"
    },
    hard: {
      label: "Master",
      icon: Rocket,
      color: "bg-purple-100 text-purple-700 border-purple-200",
      description: "Pushing the limits"
    }
  };

  const config = configs[difficulty] || configs.medium;
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-3 p-3 rounded-2xl border ${config.color} transition-all hover:scale-105`}>
      <div className="bg-white/50 p-2 rounded-xl">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black uppercase tracking-widest">Level: {config.label}</span>
        </div>
        <p className="text-[10px] font-medium opacity-80">{config.description}</p>
      </div>
    </div>
  );
}
