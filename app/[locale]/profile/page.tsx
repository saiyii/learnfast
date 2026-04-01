'use client';

import { motion } from 'framer-motion';
import { TopBar } from '@/components/ui/TopBar';
import { BottomNav } from '@/components/ui/BottomNav';
import { CurrencyDisplay } from '@/components/ui/CurrencyDisplay';
import { HeartDisplay } from '@/components/ui/HeartDisplay';
import { useGameStore } from '@/stores/gameStore';
import { Flame, Zap, Trophy, Award, Star, Settings, Globe, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { progress } = useGameStore();

  if (!progress) return null;

  const achievements = [
    { icon: Star, title: 'First Steps', desc: 'Complete 1 activity', earned: true },
    { icon: Flame, title: 'Streak Starter', desc: '7-day streak', earned: true },
    { icon: Trophy, title: 'Perfect Week', desc: '7 perfect activities', earned: false },
    { icon: Award, title: 'Scholar', desc: 'Complete 100 nodes', earned: false },
    { icon: Zap, title: 'Dedicated', desc: '30-day streak', earned: false },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <TopBar />
      
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-lg shadow-black/5 mb-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#00CEC9] flex items-center justify-center text-white text-3xl font-bold">
              L
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2D3436]">Learner</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="bg-[#6C5CE7] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  Level {progress.level}
                </div>
                <span className="text-sm text-[#636E72]">Student</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F8F9FA] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-[#6C5CE7]" />
                <span className="text-xs text-[#636E72]">Total XP</span>
              </div>
              <p className="text-xl font-bold text-[#2D3436]">{progress.total_xp.toLocaleString()}</p>
            </div>
            <div className="bg-[#F8F9FA] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-4 h-4 text-[#E17055]" />
                <span className="text-xs text-[#636E72]">Streak</span>
              </div>
              <p className="text-xl font-bold text-[#2D3436]">{progress.streak} days</p>
            </div>
            <div className="bg-[#F8F9FA] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4 text-[#FDCB6E]" />
                <span className="text-xs text-[#636E72]">Activities</span>
              </div>
              <p className="text-xl font-bold text-[#2D3436]">127</p>
            </div>
            <div className="bg-[#F8F9FA] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-[#00B894]" />
                <span className="text-xs text-[#636E72]">Achievements</span>
              </div>
              <p className="text-xl font-bold text-[#2D3436]">2/12</p>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-lg shadow-black/5 mb-6"
        >
          <h2 className="text-lg font-bold text-[#2D3436] mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#6C5CE7]" />
            Achievements
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {achievements.map((ach, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  ach.earned ? 'bg-[#F8F9FA]' : 'bg-[#F8F9FA]/50 opacity-60'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  ach.earned ? 'bg-[#FDCB6E]/20' : 'bg-[#DFE6E9]'
                }`}>
                  <ach.icon className={`w-5 h-5 ${ach.earned ? 'text-[#F39C12]' : 'text-[#636E72]'}`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#2D3436]">{ach.title}</p>
                  <p className="text-xs text-[#636E72]">{ach.desc}</p>
                </div>
                {ach.earned && (
                  <div className="bg-[#00B894] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    Earned
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 shadow-lg shadow-black/5"
        >
          <h2 className="text-lg font-bold text-[#2D3436] mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#6C5CE7]" />
            Settings
          </h2>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8F9FA] transition-colors">
              <Globe className="w-5 h-5 text-[#636E72]" />
              <span className="flex-1 text-left font-medium text-[#2D3436]">Language</span>
              <span className="text-sm text-[#636E72]">English</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8F9FA] transition-colors text-[#E17055]">
              <LogOut className="w-5 h-5" />
              <span className="flex-1 text-left font-medium">Log Out</span>
            </button>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
