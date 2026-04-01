'use client';

import { motion } from 'framer-motion';
import { Lock, Check, Skull, RefreshCw, Gift, Play } from 'lucide-react';
import type { Node, UserNode, NodeStatus } from '@/types';

interface PathNodeProps {
  node: Node;
  userNode: UserNode;
  index: number;
  isConnected?: boolean;
  onClick: (node: Node) => void;
}

const nodeIcons = {
  standard: Play,
  boss: Skull,
  review: RefreshCw,
  reward: Gift,
};

const nodeColors = {
  locked: {
    bg: 'bg-[#DFE6E9]',
    border: 'border-[#B2BEC3]',
    icon: 'text-[#636E72]',
  },
  available: {
    bg: 'bg-[#6C5CE7]',
    border: 'border-[#5B4CD4]',
    icon: 'text-white',
  },
  completed: {
    bg: 'bg-[#00B894]',
    border: 'border-[#00A187]',
    icon: 'text-white',
  },
  current: {
    bg: 'bg-[#6C5CE7]',
    border: 'border-[#FDCB6E]',
    icon: 'text-white',
  },
  boss: {
    bg: 'bg-[#E17055]',
    border: 'border-[#D63047]',
    icon: 'text-white',
  },
  review: {
    bg: 'bg-[#00CEC9]',
    border: 'border-[#00B2B0]',
    icon: 'text-white',
  },
  reward: {
    bg: 'bg-[#FDCB6E]',
    border: 'border-[#F9BF3B]',
    icon: 'text-white',
  },
};

export function PathNode({ node, userNode, index, isConnected = true, onClick }: PathNodeProps) {
  const status: NodeStatus = userNode.status;
  const Icon = nodeIcons[node.type];

  // Determine visual state
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isAvailable = status === 'available';
  const isCurrent = isAvailable && index === 5; // Demo: 6th node is current

  const colors = isLocked
    ? nodeColors.locked
    : isCompleted
    ? nodeColors.completed
    : isCurrent
    ? nodeColors.current
    : isAvailable
    ? nodeColors.available
    : nodeColors.locked;

  const canClick = !isLocked;

  return (
    <div className="relative flex flex-col items-center">
      {/* Connection line */}
      {index > 0 && (
        <div
          className={`absolute top-4 -translate-y-full h-6 w-0.5 ${
            isCompleted || isAvailable ? 'bg-[#6C5CE7]' : 'bg-[#DFE6E9]'
          }`}
          style={{ height: '24px', top: '-24px' }}
        />
      )}

      {/* Node circle */}
      <motion.button
        onClick={() => canClick && onClick(node)}
        disabled={!canClick}
        whileHover={canClick ? { scale: 1.1 } : {}}
        whileTap={canClick ? { scale: 0.95 } : {}}
        className={`
          relative w-12 h-12 rounded-full border-4 flex items-center justify-center
          transition-all duration-200 shadow-md
          ${colors.bg} ${colors.border}
          ${canClick ? 'cursor-pointer' : 'cursor-not-allowed opacity-80'}
          ${isCurrent ? 'animate-pulse-glow' : ''}
        `}
      >
        {/* Inner circle */}
        <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center`}>
          {isLocked ? (
            <Lock className={`w-5 h-5 ${colors.icon}`} />
          ) : isCompleted ? (
            <Check className={`w-5 h-5 ${colors.icon}`} />
          ) : (
            <Icon className={`w-5 h-5 ${colors.icon}`} />
          )}
        </div>

        {/* Current indicator */}
        {isCurrent && (
          <div className="absolute -inset-1 rounded-full border-4 border-[#FDCB6E] animate-pulse" />
        )}

        {/* Boss indicator */}
        {node.type === 'boss' && !isLocked && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E17055] rounded-full flex items-center justify-center">
            <Skull className="w-2.5 h-2.5 text-white" />
          </div>
        )}

        {/* Reward indicator */}
        {node.type === 'reward' && !isLocked && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FDCB6E] rounded-full flex items-center justify-center">
            <Gift className="w-2.5 h-2.5 text-white" />
          </div>
        )}
      </motion.button>

      {/* Label */}
      <span
        className={`mt-2 text-xs font-medium ${
          isLocked ? 'text-[#636E72]' : 'text-[#2D3436]'
        }`}
      >
        {isCompleted
          ? 'Done'
          : isCurrent
          ? 'Current'
          : isLocked
          ? 'Locked'
          : node.type === 'boss'
          ? 'Boss'
          : node.type === 'review'
          ? 'Review'
          : node.type === 'reward'
          ? 'Reward'
          : `Lesson ${node.position}`}
      </span>
    </div>
  );
}
