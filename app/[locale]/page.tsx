'use client';

import { motion } from 'framer-motion';
import { TopBar } from '@/components/ui/TopBar';
import { BottomNav } from '@/components/ui/BottomNav';
import { BottomHUD } from '@/components/ui/TopBar';
import { PathView } from '@/components/path/PathView';
import { LevelUpModal } from '@/components/modals/LevelUpModal';
import { ChestModal } from '@/components/modals/ChestModal';
import { QuestModal } from '@/components/modals/QuestModal';
import { useState } from 'react';
import { Target } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';

export default function HomePage() {
  const { showLevelUp, setShowLevelUp, showChest, setShowChest, newLevel } = useGameStore();
  const [showQuests, setShowQuests] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <TopBar onSettingsClick={() => {}} />
      
      {/* Quest indicator */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setShowQuests(true)}
        className="fixed top-20 right-4 z-50 bg-white rounded-full p-3 shadow-lg shadow-black/10 flex items-center gap-2 px-4"
      >
        <Target className="w-5 h-5 text-[#6C5CE7]" />
        <span className="text-sm font-bold text-[#2D3436]">Quests</span>
      </motion.button>

      <PathView />
      <BottomHUD />
      <BottomNav />

      <LevelUpModal isOpen={showLevelUp} onClose={() => setShowLevelUp(false)} />
      <ChestModal isOpen={showChest} onClose={() => setShowChest(false)} />
      <QuestModal isOpen={showQuests} onClose={() => setShowQuests(false)} />
    </div>
  );
}
