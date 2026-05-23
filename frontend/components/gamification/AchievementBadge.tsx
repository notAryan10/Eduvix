"use client";

import React from "react";
import { Award, Trophy, Star, Zap, Calculator, FlaskConical, Book } from "lucide-react";
import { Card } from "../ui/Card";

const icons: Record<string, any> = {
  calculator: Calculator,
  book: Book,
  flask: FlaskConical,
  flame: Zap,
  zap: Zap,
  star: Star,
  trophy: Trophy,
  award: Award,
};

interface AchievementBadgeProps {
  name: string;
  description: string;
  icon?: string;
  unlockedAt?: string;
  xpReward?: number;
}

export function AchievementBadge({ name, description, icon, unlockedAt, xpReward }: AchievementBadgeProps) {
  const Icon = icons[icon || "award"] || Award;
  const isUnlocked = !!unlockedAt;

  return (
    <Card className={`p-4 flex items-center gap-4 transition-all ${isUnlocked ? "bg-white border-blue-100" : "bg-gray-50 opacity-50 grayscale"}`}>
      <div className={`p-3 rounded-2xl ${isUnlocked ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-400"}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 text-sm">{name}</h4>
        <p className="text-[10px] text-gray-500 leading-tight">{description}</p>
        {isUnlocked && (
          <p className="text-[10px] font-bold text-blue-600 mt-1">Unlocked {new Date(unlockedAt).toLocaleDateString()}</p>
        )}
      </div>
      {xpReward && !isUnlocked && (
        <div className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-1 rounded-lg">
          +{xpReward} XP
        </div>
      )}
    </Card>
  );
}
