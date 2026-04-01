'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Coins, Zap } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';

interface ChestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const rewards = [
  { type: 'coins', amount: 20, icon: Coins, color: '#FDCB6E' },
  { type: 'coins', amount: 50, icon: Coins, color: '#FDCB6E' },
  { type: 'xp', amount: 25, icon: Zap, color: '#6C5CE7' },
];

export function ChestModal({ isOpen, onClose }: ChestModalProps) {
  const { chestReward } = useGameStore();

  if (!isOpen) return null;

  const reward = chestReward || rewards[Math.floor(Math.random() * rewards.length)];
  const Icon = reward.type === 'coins' ? Coins : Zap;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl"
          >
            {/* Chest icon */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 1,
                repeat: 2,
                repeatDelay: 0.5,
              }}
              className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#FDCB6E] to-[#F39C12] rounded-2xl flex items-center justify-center shadow-lg shadow-[#FDCB6E]/30"
            >
              <Gift className="w-12 h-12 text-white" />
            </motion.div>

            {/* Title */}
            <h2 className="text-xl font-bold text-[#2D3436] mb-2">Chest Found!</h2>
            <p className="text-[#636E72] mb-4">You opened a reward chest</p>

            {/* Reward */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 500 }}
              className="inline-flex items-center gap-2 bg-[#FDCB6E]/20 px-6 py-3 rounded-xl mb-6"
              style={{ color: reward.type === 'coins' ? '#F39C12' : '#6C5CE7' }}
            >
              <Icon className="w-6 h-6" style={{ color: reward.color }} />
              <span className="font-bold text-lg">
                +{reward.amount} {reward.type === 'coins' ? 'Coins' : 'XP'}
              </span>
            </motion.div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-full bg-[#6C5CE7] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#6C5CE7]/30"
            >
              Collect
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
