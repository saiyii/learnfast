'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface HeartDisplayProps {
  hearts: number;
  maxHearts?: number;
  size?: 'sm' | 'md' | 'lg';
  showAnimation?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export function HeartDisplay({ hearts, maxHearts = 5, size = 'md', showAnimation = true }: HeartDisplayProps) {
  const iconSize = sizeClasses[size];

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxHearts }).map((_, i) => {
        const isFull = i < hearts;

        return (
          <motion.div
            key={i}
            initial={showAnimation && isFull ? { scale: 0 } : false}
            animate={showAnimation && isFull ? { scale: 1 } : false}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            <Heart
              className={`${iconSize} transition-colors duration-200 ${
                isFull
                  ? 'fill-[#E17055] text-[#E17055]'
                  : 'fill-transparent text-[#DFE6E9]'
              }`}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

interface HeartLossProps {
  onAnimationComplete?: () => void;
}

export function HeartLoss({ onAnimationComplete }: HeartLossProps) {
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }}
      transition={{ duration: 0.4 }}
      onAnimationComplete={onAnimationComplete}
      className="text-[#E17055]"
    >
      <Heart className="w-6 h-6 fill-[#E17055]" />
    </motion.div>
  );
}
