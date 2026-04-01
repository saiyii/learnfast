'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

interface XPPopupProps {
  amount: number;
  isVisible: boolean;
  isBonus?: boolean;
  onComplete?: () => void;
}

export function XPPopup({ amount, isVisible, isBonus = false, onComplete }: XPPopupProps) {
  return (
    <AnimatePresence onAnimationComplete={onComplete}>
      {isVisible && (
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -40, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 flex items-center gap-1 ${
            isBonus ? 'text-[#FDCB6E]' : 'text-white'
          } font-bold text-xl`}
        >
          <Star className={`w-5 h-5 ${isBonus ? 'fill-[#FDCB6E] text-[#FDCB6E]' : 'fill-white'}`} />
          <span>+{amount} XP</span>
          {isBonus && <span className="text-sm">(Bonus)</span>}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface XPGainProps {
  amount: number;
  isBonus?: boolean;
}

export function XPGain({ amount, isBonus = false }: XPGainProps) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${
        isBonus ? 'bg-[#FDCB6E]/20 text-[#FDCB6E]' : 'bg-[#6C5CE7]/20 text-[#6C5CE7]'
      } font-bold text-sm`}
    >
      <Star className={`w-4 h-4 ${isBonus ? 'fill-[#FDCB6E]' : 'fill-[#6C5CE7]'}`} />
      +{amount} XP
    </motion.div>
  );
}
