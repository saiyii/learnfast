'use client';

import { motion } from 'framer-motion';
import { TopBar } from '@/components/ui/TopBar';
import { BottomNav } from '@/components/ui/BottomNav';
import { CurrencyDisplay } from '@/components/ui/CurrencyDisplay';
import { Coins, Gem, Zap, Heart, Snowflake, RotateCcw, ShoppingBag } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';

const powerUps = [
  { id: 'xp_boost', name: 'XP Boost', desc: '2x XP for 1 hour', icon: Zap, price: 100, color: '#6C5CE7', owned: false },
  { id: 'heart_refill', name: 'Heart Refill', desc: 'Restore 5 hearts', icon: Heart, price: 50, color: '#E17055', owned: false },
  { id: 'streak_freeze', name: 'Streak Freeze', desc: 'Protect streak 1 day', icon: Snowflake, price: 150, color: '#00CEC9', owned: true },
  { id: 'retry', name: 'Retry', desc: 'Skip wrong penalty', icon: RotateCcw, price: 30, color: '#F39C12', owned: false },
];

export default function ShopPage() {
  const { progress } = useGameStore();

  if (!progress) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <TopBar />
      <div className="max-w-lg mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#2D3436]">Shop</h1>
            <p className="text-[#636E72]">Power-ups and items</p>
          </div>
          <CurrencyDisplay coins={progress.coins} gems={progress.gems} size="md" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-lg font-bold text-[#2D3436] mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#6C5CE7]" /> Power-Ups
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {powerUps.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                className={`bg-white rounded-2xl p-4 shadow-lg shadow-black/5 ${item.owned ? 'opacity-70' : ''}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${item.color}20` }}>
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3 className="font-bold text-[#2D3436] mb-1">{item.name}</h3>
                <p className="text-xs text-[#636E72] mb-3">{item.desc}</p>
                {item.owned ? (
                  <div className="w-full py-2 text-center bg-[#00B894]/10 text-[#00B894] font-bold text-sm rounded-lg">Owned</div>
                ) : (
                  <button className="w-full py-2 flex items-center justify-center gap-2 bg-[#6C5CE7] text-white font-bold text-sm rounded-lg shadow-md shadow-[#6C5CE7]/20">
                    <Coins className="w-4 h-4" /><span>{item.price}</span>
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8">
          <h2 className="text-lg font-bold text-[#2D3436] mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#F39C12]" /> Bundles
          </h2>
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] rounded-2xl p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center"><Gem className="w-7 h-7" /></div>
                <div className="flex-1"><h3 className="font-bold">Starter Pack</h3><p className="text-sm text-white/70">50 gems + 500 coins</p></div>
                <div className="bg-white text-[#6C5CE7] font-bold px-4 py-2 rounded-xl">$4.99</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg shadow-black/5">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-[#FDCB6E]/20 flex items-center justify-center"><Coins className="w-7 h-7 text-[#F39C12]" /></div>
                <div className="flex-1"><h3 className="font-bold text-[#2D3436]">Coins Pack</h3><p className="text-sm text-[#636E72]">1000 coins</p></div>
                <div className="bg-[#6C5CE7] text-white font-bold px-4 py-2 rounded-xl">$1.99</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
}
