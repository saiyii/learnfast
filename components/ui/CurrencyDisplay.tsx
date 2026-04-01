'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Gem } from 'lucide-react';

interface CurrencyDisplayProps {
  coins: number;
  gems?: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const sizeClasses = {
  sm: { icon: 'w-4 h-4', text: 'text-sm' },
  md: { icon: 'w-5 h-5', text: 'text-base' },
  lg: { icon: 'w-6 h-6', text: 'text-lg' },
};

export function CurrencyDisplay({ coins, gems = 0, size = 'md', animated = true }: CurrencyDisplayProps) {
  const classes = sizeClasses[size];

  return (
    <div className="flex items-center gap-3">
      {/* Coins */}
      <div className="flex items-center gap-1 bg-[#FDCB6E]/20 px-2 py-1 rounded-full">
        <Coins className={`${classes.icon} text-[#FDCB6E]`} />
        <span className={`${classes.text} font-mono font-bold text-[#2D3436]`}>
          {animated ? (
            <AnimatePresence mode="popLayout">
              <motion.span
                key={coins}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {coins.toLocaleString()}
              </motion.span>
            </AnimatePresence>
          ) : (
            coins.toLocaleString()
          )}
        </span>
      </div>

      {/* Gems (if any) */}
      {gems > 0 && (
        <div className="flex items-center gap-1 bg-[#6C5CE7]/20 px-2 py-1 rounded-full">
          <Gem className={`${classes.icon} text-[#6C5CE7]`} />
          <span className={`${classes.text} font-mono font-bold text-[#2D3436]`}>
            {animated ? (
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={gems}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {gems}
                </motion.span>
              </AnimatePresence>
            ) : (
              gems
            )}
          </span>
        </div>
      )}
    </div>
  );
}
