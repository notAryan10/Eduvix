"use client";

import React from "react";
import { motion } from "framer-motion";

interface XPProgressBarProps {
  xp: number;
  level: number;
  nextLevelXP?: number;
}

export function XPProgressBar({ xp, level, nextLevelXP = 100 }: XPProgressBarProps) {
  const currentXP = xp % nextLevelXP;
  const progress = (currentXP / nextLevelXP) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Level {level}</span>
          <p className="text-sm font-bold text-gray-900">Explorer Rank</p>
        </div>
        <span className="text-xs font-bold text-gray-400">{currentXP} / {nextLevelXP} XP</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        />
      </div>
    </div>
  );
}
