'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star, Coins, Trophy } from 'lucide-react';
import { ExerciseCard } from '@/components/exercises/ExerciseCard';
import { XPGain } from '@/components/ui/XPPopup';
import { HeartDisplay } from '@/components/ui/HeartDisplay';
import { useGameStore } from '@/stores/gameStore';

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Phase = 'playing' | 'result' | 'complete';

export function ActivityModal({ isOpen, onClose }: ActivityModalProps) {
  const {
    activitySession,
    currentNode,
    answerExercise,
    completeActivity,
    progress,
  } = useGameStore();

  const [phase, setPhase] = useState<Phase>('playing');
  const [showResult, setShowResult] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [showXP, setShowXP] = useState(false);

  const session = activitySession;
  const node = currentNode;

  useEffect(() => {
    if (isOpen && session && !session.completed) {
      setPhase('playing');
      setShowResult(false);
    }
  }, [isOpen, session]);

  if (!session || !node || !progress) return null;

  const currentExercise = session.exercises[session.current_index];
  const isLastExercise = session.current_index >= session.exercises.length - 1;

  const handleAnswer = (correct: boolean) => {
    setWasCorrect(correct);
    setShowResult(true);
    answerExercise(correct);

    if (correct) {
      const earned = 10;
      setEarnedXP(earned);
      setShowXP(true);
      setTimeout(() => setShowXP(false), 1000);
    }
  };

  const handleNext = () => {
    setShowResult(false);

    if (session.current_index >= session.exercises.length - 1 || session.hearts_remaining <= 0) {
      // Activity complete
      completeActivity();
      setPhase('complete');
    } else {
      // Next exercise
      setPhase('playing');
    }
  };

  const handleClose = () => {
    setPhase('playing');
    setShowResult(false);
    onClose();
  };

  const score = Math.round((session.correct_count / session.exercises.length) * 100);
  const perfect = score === 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-[#DFE6E9]">
              <div className="flex items-center justify-between">
                {/* Hearts */}
                <HeartDisplay hearts={session.hearts_remaining} maxHearts={progress.max_hearts} />

                {/* Title */}
                <h2 className="font-bold text-[#2D3436]">
                  {node.type === 'boss' ? 'Boss Fight' : node.type === 'review' ? 'Review' : 'Practice'}
                </h2>

                {/* Close */}
                <button onClick={handleClose} className="p-2 rounded-lg hover:bg-[#F8F9FA]">
                  <X className="w-5 h-5 text-[#636E72]" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {phase === 'playing' && currentExercise && (
                <div className="relative">
                  {showXP && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                      <XPGain amount={earnedXP} />
                    </div>
                  )}
                  <ExerciseCard
                    exercise={currentExercise}
                    questionNumber={session.current_index + 1}
                    totalQuestions={session.exercises.length}
                    onAnswer={handleAnswer}
                    showResult={showResult}
                    wasCorrect={wasCorrect}
                  />
                </div>
              )}

              {showResult && !session.completed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="w-full bg-[#6C5CE7] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#6C5CE7]/30"
                  >
                    {isLastExercise ? 'Finish' : 'Next'}
                  </motion.button>
                </motion.div>
              )}

              {phase === 'complete' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                    className="w-20 h-20 mx-auto mb-4 bg-[#FDCB6E] rounded-full flex items-center justify-center"
                  >
                    <Trophy className="w-10 h-10 text-white" />
                  </motion.div>

                  <h2 className="text-2xl font-bold text-[#2D3436] mb-2">
                    {perfect ? 'Perfect!' : 'Complete!'}
                  </h2>

                  <p className="text-[#636E72] mb-6">
                    You scored {score}% ({session.correct_count}/{session.exercises.length})
                  </p>

                  {/* Rewards */}
                  <div className="flex justify-center gap-4 mb-6">
                    <div className="flex items-center gap-1 bg-[#6C5CE7]/10 px-4 py-2 rounded-xl">
                      <Star className="w-5 h-5 text-[#6C5CE7] fill-[#6C5CE7]" />
                      <span className="font-bold text-[#6C5CE7]">+{session.xp_earned} XP</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#FDCB6E]/10 px-4 py-2 rounded-xl">
                      <Coins className="w-5 h-5 text-[#F39C12]" />
                      <span className="font-bold text-[#F39C12]">+{Math.floor(Math.random() * 10) + 5}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    className="w-full bg-[#6C5CE7] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#6C5CE7]/30"
                  >
                    Continue
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
