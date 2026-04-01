'use client';

import { motion } from 'framer-motion';
import { TopBar } from '@/components/ui/TopBar';
import { BottomNav } from '@/components/ui/BottomNav';
import { Trophy, Crown, Medal, TrendingUp } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';

const mockLeaderboard = [
  { rank: 1, username: 'Maria_G', xp: 2450, tier: 'gold', avatar: 'M' },
  { rank: 2, username: 'John_Doe', xp: 2100, tier: 'gold', avatar: 'J' },
  { rank: 3, username: 'Alex_K', xp: 1890, tier: 'silver', avatar: 'A' },
  { rank: 4, username: 'Emma_W', xp: 1650, tier: 'silver', avatar: 'E' },
  { rank: 5, username: 'You', xp: 1250, tier: 'silver', avatar: 'L', isYou: true },
  { rank: 6, username: 'Sophie_L', xp: 1100, tier: 'bronze', avatar: 'S' },
  { rank: 7, username: 'Lucas_M', xp: 980, tier: 'bronze', avatar: 'L' },
  { rank: 8, username: 'Mia_R', xp: 850, tier: 'bronze', avatar: 'M' },
];

const tierColors: Record<string, { bg: string; text: string }> = {
  bronze: { bg: 'bg-[#CD7F32]/20', text: 'text-[#CD7F32]' },
  silver: { bg: 'bg-[#C0C0C0]/20', text: 'text-[#C0C0C0]' },
  gold: { bg: 'bg-[#FDCB6E]/20', text: 'text-[#F39C12]' },
  diamond: { bg: 'bg-[#6C5CE7]/20', text: 'text-[#6C5CE7]' },
};

export default function LeaderboardPage() {
  const { progress } = useGameStore();

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <TopBar />
      <div className="max-w-lg mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#2D3436] mb-2">Leaderboard</h1>
          <p className="text-[#636E72]">Weekly rankings - resets Monday</p>
        </motion.div>

        {progress && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#6C5CE7] rounded-2xl p-4 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">#5</span>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">L</div>
                <div>
                  <p className="font-bold">You</p>
                  <p className="text-sm text-white/70">Level {progress.level}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{progress.total_xp.toLocaleString()}</p>
                <p className="text-sm text-white/70">XP this week</p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-end justify-center gap-3 mb-6">
          <div className="flex-1 bg-[#C0C0C0]/20 rounded-t-2xl p-4 text-center order-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#C0C0C0] flex items-center justify-center text-white font-bold text-lg mb-2">{mockLeaderboard[1].avatar}</div>
            <p className="font-bold text-[#2D3436] truncate">{mockLeaderboard[1].username}</p>
            <p className="text-sm text-[#636E72]">{mockLeaderboard[1].xp.toLocaleString()} XP</p>
            <div className="mt-2 bg-[#C0C0C0] text-white text-xs font-bold px-3 py-1 rounded-full inline-block">#2</div>
          </div>
          <div className="flex-1 bg-[#FDCB6E]/20 rounded-t-2xl p-4 text-center order-1">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#F39C12] to-[#FDCB6E] flex items-center justify-center text-white font-bold text-xl mb-2 shadow-lg shadow-[#FDCB6E]/30">{mockLeaderboard[0].avatar}</div>
            <p className="font-bold text-[#2D3436] truncate">{mockLeaderboard[0].username}</p>
            <p className="text-sm text-[#636E72]">{mockLeaderboard[0].xp.toLocaleString()} XP</p>
            <div className="mt-2 bg-[#F39C12] text-white text-xs font-bold px-3 py-1 rounded-full inline-block flex items-center gap-1"><Crown className="w-3 h-3" /> #1</div>
          </div>
          <div className="flex-1 bg-[#CD7F32]/20 rounded-t-2xl p-4 text-center order-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#CD7F32] flex items-center justify-center text-white font-bold text-lg mb-2">{mockLeaderboard[2].avatar}</div>
            <p className="font-bold text-[#2D3436] truncate">{mockLeaderboard[2].username}</p>
            <p className="text-sm text-[#636E72]">{mockLeaderboard[2].xp.toLocaleString()} XP</p>
            <div className="mt-2 bg-[#CD7F32] text-white text-xs font-bold px-3 py-1 rounded-full inline-block">#3</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
          {mockLeaderboard.slice(3).map((entry) => {
            const tierStyle = tierColors[entry.tier] || tierColors.bronze;
            return (
              <div key={entry.rank} className={`flex items-center gap-3 p-4 border-b border-[#DFE6E9] last:border-b-0 ${entry.isYou ? 'bg-[#6C5CE7]/5' : ''}`}>
                <span className="w-8 text-center font-bold text-[#636E72]">#{entry.rank}</span>
                <div className={`w-10 h-10 rounded-full ${entry.isYou ? 'bg-[#6C5CE7]' : tierStyle.bg} flex items-center justify-center text-white font-bold`}>{entry.avatar}</div>
                <div className="flex-1">
                  <p className="font-bold text-[#2D3436]">{entry.username}{entry.isYou && <span className="text-[#6C5CE7] ml-1">(You)</span>}</p>
                  <p className={`text-xs ${tierStyle.text} capitalize`}>{entry.tier}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#2D3436]">{entry.xp.toLocaleString()}</p>
                  <p className="text-xs text-[#636E72]">XP</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 bg-white rounded-2xl p-4 shadow-lg shadow-black/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#C0C0C0]/20 flex items-center justify-center"><Medal className="w-6 h-6 text-[#C0C0C0]" /></div>
              <div>
                <p className="font-bold text-[#2D3436]">Silver League</p>
                <p className="text-sm text-[#636E72]">5 more XP to promote</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#00B894]"><TrendingUp className="w-5 h-5" /><span className="font-bold">Promotion!</span></div>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
}
