'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Star, Gift } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LevelUpModal({ isOpen, onClose }: LevelUpModalProps) {
  const { newLevel, progress } = useGameStore();

  if (!isOpen) return null;

  const reward = 50; // Demo reward

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
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl overflow-hidden"
          >
            {/* Confetti background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    y: -20,
                    x: Math.random() * 200 - 100,
                    rotate: 0,
                    opacity: 1,
                  }}
                  animate={{
                    y: 400,
                    x: Math.random() * 200 - 100,
                    rotate: 720,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    delay: Math.random() * 0.5,
                  }}
                  className={`absolute w-3 h-3 rounded-full ${
                    ['#6C5CE7', '#00CEC9', '#FDCB6E', '#E17055', '#00B894'][
                      Math.floor(Math.random() * 5)
                    ]
                  }`}
                  style={{ left: `${Math.random() * 100}%` }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Trophy icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
                className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#FDCB6E] to-[#F39C12] rounded-full flex items-center justify-center shadow-lg shadow-[#FDCB6E]/30"
              >
                <Zap className="w-10 h-10 text-white" />
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-[#2D3436] mb-2"
              >
                Level Up!
              </motion.h2>

              {/* New level */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 500 }}
                className="inline-flex items-center gap-2 bg-[#6C5CE7] text-white px-6 py-2 rounded-full mb-4"
              >
                <Star className="w-5 h-5 fill-white" />
                <span className="font-bold text-lg">Level {newLevel}</span>
              </motion.div>

              {/* Reward */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-2 bg-[#FDCB6E]/20 text-[#F39C12] px-4 py-2 rounded-xl mb-6"
              >
                <Gift className="w-5 h-5" />
                <span className="font-bold">+{reward} Coins</span>
              </motion.div>

              {/* Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-full bg-[#6C5CE7] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#6C5CE7]/30"
              >
                Awesome!
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
