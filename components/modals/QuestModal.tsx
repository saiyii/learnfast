'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Clock, Gift, Check } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';

interface QuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuestModal({ isOpen, onClose }: QuestModalProps) {
  const { activeQuests, userQuests, claimQuest } = useGameStore();

  if (!isOpen) return null;

  const dailyQuests = activeQuests.filter((q) => q.type === 'daily');
  const weeklyQuests = activeQuests.filter((q) => q.type === 'weekly');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[80vh] overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-[#DFE6E9] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#6C5CE7]" />
                <h2 className="font-bold text-[#2D3436]">Quests</h2>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F8F9FA]">
                <X className="w-5 h-5 text-[#636E72]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6 overflow-y-auto max-h-[60vh]">
              {/* Daily Quests */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-[#00CEC9]" />
                  <h3 className="font-bold text-[#2D3436]">Daily</h3>
                </div>
                <div className="space-y-3">
                  {dailyQuests.map((quest) => {
                    const uq = userQuests.find((u) => u.quest_id === quest.id);
                    const progress = uq?.progress ?? 0;
                    const completed = uq?.completed ?? false;
                    const pct = Math.min((progress / quest.target) * 100, 100);

                    return (
                      <div
                        key={quest.id}
                        className={`p-3 rounded-xl border-2 ${
                          completed ? 'border-[#00B894] bg-[#00B894]/5' : 'border-[#DFE6E9]'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-[#2D3436]">{quest.title}</h4>
                            <p className="text-xs text-[#636E72]">{quest.description}</p>
                          </div>
                          {completed && <Check className="w-5 h-5 text-[#00B894]" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-[#DFE6E9] rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-[#6C5CE7] rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-[#636E72]">
                            {progress}/{quest.target}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          <Gift className="w-4 h-4 text-[#F39C12]" />
                          <span className="text-xs font-medium text-[#F39C12]">
                            +{quest.reward_coins} coins
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Weekly Quests */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-[#6C5CE7]" />
                  <h3 className="font-bold text-[#2D3436]">Weekly</h3>
                </div>
                <div className="space-y-3">
                  {weeklyQuests.map((quest) => {
                    const uq = userQuests.find((u) => u.quest_id === quest.id);
                    const progress = uq?.progress ?? 0;
                    const completed = uq?.completed ?? false;
                    const pct = Math.min((progress / quest.target) * 100, 100);

                    return (
                      <div
                        key={quest.id}
                        className={`p-3 rounded-xl border-2 ${
                          completed ? 'border-[#00B894] bg-[#00B894]/5' : 'border-[#DFE6E9]'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-[#2D3436]">{quest.title}</h4>
                            <p className="text-xs text-[#636E72]">{quest.description}</p>
                          </div>
                          {completed && <Check className="w-5 h-5 text-[#00B894]" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-[#DFE6E9] rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-[#6C5CE7] rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-[#636E72]">
                            {progress}/{quest.target}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            <Gift className="w-4 h-4 text-[#F39C12]" />
                            <span className="text-xs font-medium text-[#F39C12]">
                              +{quest.reward_coins} coins
                            </span>
                          </div>
                          {quest.reward_gems && (
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-medium text-[#6C5CE7]">
                                +{quest.reward_gems} gem
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
