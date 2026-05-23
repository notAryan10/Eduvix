"use client";

import React from "react";
import { Flame } from "lucide-react";
import { motion } from "framer-motion";

interface StreakCounterProps {
  streak: number;
}

export function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-2xl border border-orange-100">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Flame className={`w-5 h-5 ${streak > 0 ? "text-orange-500 fill-orange-500" : "text-gray-300"}`} />
      </motion.div>
      <div className="flex flex-col">
        <span className="text-sm font-black text-gray-900 leading-none">{streak}</span>
        <span className="text-[10px] font-bold text-orange-600 uppercase tracking-tighter">Day Streak</span>
      </div>
    </div>
  );
}
