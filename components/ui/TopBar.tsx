'use client';

import { motion } from 'framer-motion';
import { Flame, Settings, Zap } from 'lucide-react';
import { HeartDisplay } from './HeartDisplay';
import { CurrencyDisplay } from './CurrencyDisplay';
import { useGameStore } from '@/stores/gameStore';

interface TopBarProps {
  showSettings?: boolean;
  onSettingsClick?: () => void;
}

export function TopBar({ showSettings = true, onSettingsClick }: TopBarProps) {
  const { progress } = useGameStore();

  if (!progress) return null;

  const xpForNextLevel = progress.level * 100;
  const xpProgress = (progress.xp / xpForNextLevel) * 100;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#DFE6E9] px-4 py-3">
      <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
        {/* Streak */}
        <motion.div
          className="flex items-center gap-1.5"
          animate={progress.streak >= 7 ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <Flame
            className={`w-5 h-5 ${
              progress.streak > 0 ? 'fill-[#E17055] text-[#E17055]' : 'text-[#DFE6E9]'
            }`}
          />
          <span
            className={`font-bold font-mono ${
              progress.streak > 0 ? 'text-[#E17055]' : 'text-[#636E72]'
            }`}
          >
            {progress.streak}
          </span>
        </motion.div>

        {/* Level & XP Bar */}
        <div className="flex-1 max-w-[200px]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-[#6C5CE7] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-sm font-bold text-[#2D3436]">Level {progress.level}</span>
          </div>
          <div className="h-2 bg-[#DFE6E9] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Currency */}
        <CurrencyDisplay coins={progress.coins} gems={progress.gems} size="sm" />

        {/* Settings */}
        {showSettings && (
          <button
            onClick={onSettingsClick}
            className="p-2 rounded-lg hover:bg-[#F8F9FA] transition-colors"
          >
            <Settings className="w-5 h-5 text-[#636E72]" />
          </button>
        )}
      </div>
    </header>
  );
}

interface BottomHUDProps {
  showHearts?: boolean;
  showCurrency?: boolean;
}

export function BottomHUD({ showHearts = true, showCurrency = true }: BottomHUDProps) {
  const { progress } = useGameStore();

  if (!progress) return null;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-[#DFE6E9] px-4 py-3">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        {/* Hearts */}
        {showHearts && (
          <div className="flex items-center gap-2">
            <HeartDisplay hearts={progress.hearts} maxHearts={progress.max_hearts} />
            {progress.heart_refill_at && (
              <span className="text-xs text-[#636E72]">
                +1 in 30m
              </span>
            )}
          </div>
        )}

        {/* Currency */}
        {showCurrency && (
          <CurrencyDisplay coins={progress.coins} gems={progress.gems} size="md" />
        )}
      </div>
    </footer>
  );
}
