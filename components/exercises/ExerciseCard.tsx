'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle } from 'lucide-react';
import type { Exercise } from '@/types';

interface ExerciseCardProps {
  exercise: Exercise;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (correct: boolean) => void;
  showResult?: boolean;
  wasCorrect?: boolean;
}

export function ExerciseCard({
  exercise,
  questionNumber,
  totalQuestions,
  onAnswer,
  showResult = false,
  wasCorrect = false,
}: ExerciseCardProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    const correct = selected === exercise.correct_answer;
    onAnswer(correct);
  };

  const getOptionStyle = (index: number) => {
    const baseStyle =
      'w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3';

    if (showResult) {
      if (index === exercise.correct_answer) {
        return `${baseStyle} border-[#00B894] bg-[#00B894]/10`;
      }
      if (index === selected && !wasCorrect) {
        return `${baseStyle} border-[#E17055] bg-[#E17055]/10`;
      }
      return `${baseStyle} border-[#DFE6E9] bg-[#F8F9FA]`;
    }

    if (selected === index) {
      return `${baseStyle} border-[#6C5CE7] bg-[#6C5CE7]/10`;
    }
    return `${baseStyle} border-[#DFE6E9] bg-white hover:border-[#6C5CE7]/50`;
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-[#636E72]">
          Question {questionNumber} of {totalQuestions}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < questionNumber ? 'bg-[#6C5CE7]' : 'bg-[#DFE6E9]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <motion.h2
        key={exercise.question}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-[#2D3436] mb-6 text-center"
      >
        {exercise.question}
      </motion.h2>

      {/* Options */}
      <div className="space-y-3">
        {exercise.options?.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSelect(index)}
            className={getOptionStyle(index)}
            disabled={showResult}
          >
            <span
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                selected === index
                  ? 'bg-[#6C5CE7] text-white'
                  : 'bg-[#DFE6E9] text-[#636E72]'
              }`}
            >
              {optionLabels[index]}
            </span>
            <span className="flex-1 text-left font-medium text-[#2D3436]">{option}</span>
            {showResult && index === exercise.correct_answer && (
              <Check className="w-5 h-5 text-[#00B894]" />
            )}
            {showResult && index === selected && !wasCorrect && (
              <X className="w-5 h-5 text-[#E17055]" />
            )}
          </motion.button>
        ))}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-4 p-3 rounded-xl ${
              wasCorrect ? 'bg-[#00B894]/10' : 'bg-[#E17055]/10'
            }`}
          >
            <div className="flex items-center gap-2">
              {wasCorrect ? (
                <>
                  <Check className="w-5 h-5 text-[#00B894]" />
                  <span className="font-bold text-[#00B894]">Correct!</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-[#E17055]" />
                  <span className="font-bold text-[#E17055]">Incorrect</span>
                </>
              )}
            </div>
            {!wasCorrect && (
              <p className="text-sm text-[#636E72] mt-1">
                The answer was: {exercise.options?.[exercise.correct_answer as number]}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm button */}
      {!showResult && selected !== null && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConfirm}
          className="w-full mt-6 bg-[#6C5CE7] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#6C5CE7]/30"
        >
          Confirm
        </motion.button>
      )}
    </div>
  );
}
