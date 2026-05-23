"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { AchievementBadge } from "@/components/gamification/AchievementBadge";
import { XPProgressBar } from "@/components/gamification/XPProgressBar";
import { StreakCounter } from "@/components/gamification/StreakCounter";
import { api } from "@/services/api";
import { Trophy, Star, Target, Zap, Rocket } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function AchievementsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const ALL_ACHIEVEMENTS = [
    { name: 'Math Master', description: 'Perfect score in a Math quiz', icon: 'calculator', xpReward: 50 },
    { name: 'Spelling Champion', description: 'Complete a spelling test with 100% accuracy', icon: 'book', xpReward: 50 },
    { name: 'Science Explorer', description: 'Complete 5 Science quizzes', icon: 'flask', xpReward: 100 },
    { name: '7-Day Streak', description: 'Study for 7 days in a row', icon: 'flame', xpReward: 200 },
    { name: 'Quick Learner', description: 'Complete a quiz in under 2 minutes', icon: 'zap', xpReward: 50 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, achRes] = await Promise.all([
          api.getGamificationProfile(),
          api.getAchievements()
        ]);
        setProfile(profileRes);
        setAchievements(achRes);
      } catch (err) {
        console.error("Failed to fetch achievements data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getAchievementData = (name: string) => {
    return achievements.find(a => a.achievementName === name);
  };

  if (loading) return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Stats */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 bg-blue-600 text-white border-none shadow-xl shadow-blue-200">
            <Trophy className="w-12 h-12 text-blue-200 mb-4" />
            <h2 className="text-3xl font-black">{achievements.length} / {ALL_ACHIEVEMENTS.length}</h2>
            <p className="text-blue-100 font-bold uppercase tracking-widest text-xs">Achievements Unlocked</p>
          </Card>
          
          <Card className="p-8 flex flex-col justify-center gap-4">
            <XPProgressBar xp={profile?.xp || 0} level={profile?.level || 1} />
          </Card>

          <Card className="p-8 flex items-center justify-between">
            <StreakCounter streak={profile?.currentStreak || 0} />
            <div className="text-right">
              <p className="text-xs font-bold text-gray-400 uppercase">Longest Streak</p>
              <p className="text-2xl font-black text-gray-900">{profile?.longestStreak || 0} Days</p>
            </div>
          </Card>
        </div>

        {/* Achievement Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-gray-900">Your Trophy Room</h2>
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              Keep learning to unlock them all!
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_ACHIEVEMENTS.map((ach, i) => {
              const unlocked = getAchievementData(ach.name);
              return (
                <AchievementBadge 
                  key={i}
                  name={ach.name}
                  description={ach.description}
                  icon={ach.icon}
                  unlockedAt={unlocked?.unlockedAt}
                  xpReward={ach.xpReward}
                />
              );
            })}
          </div>
        </section>

        {/* Learning Badges (Placeholder for future) */}
        <section className="bg-gray-50 p-10 rounded-[40px] border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Subject Badges</h2>
          </div>
          <div className="flex flex-wrap gap-6">
             {['History Buff', 'Science Whiz', 'Math Wizard', 'Grammar Pro'].map((tag, i) => (
               <div key={i} className="bg-white px-6 py-4 rounded-3xl border border-gray-100 shadow-sm opacity-40 grayscale flex items-center gap-3">
                 <Target className="w-5 h-5 text-gray-400" />
                 <span className="font-bold text-gray-400">{tag}</span>
               </div>
             ))}
          </div>
          <p className="mt-8 text-sm text-gray-400 font-medium">Coming soon: Earn special badges by mastering entire subjects!</p>
        </section>
      </div>
    </DashboardLayout>
  );
}
