'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Upload } from 'lucide-react';
import { PathWorld } from './PathWorld';
import { UploadModal } from '@/components/modals/UploadModal';
import { ActivityModal } from '@/components/modals/ActivityModal';
import { useGameStore } from '@/stores/gameStore';
import type { Node } from '@/types';

export function PathView() {
  const { worlds, nodes, userNodes, startActivity, currentNode, activitySession } = useGameStore();
  const [showUpload, setShowUpload] = useState(false);
  const [showActivity, setShowActivity] = useState(false);

  const handleNodeClick = (node: Node) => {
    if (node.type === 'standard' || node.type === 'review') {
      startActivity(node);
      setShowActivity(true);
    } else if (node.type === 'boss') {
      startActivity(node);
      setShowActivity(true);
    } else if (node.type === 'reward') {
      // Claim reward directly
      setShowUpload(true);
    }
  };

  const handleCloseActivity = () => {
    setShowActivity(false);
  };

  return (
    <div className="relative min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-[72px] z-40 bg-[#F8F9FA] px-4 py-4 border-b border-[#DFE6E9]">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#2D3436]">Your Path</h1>
            <p className="text-sm text-[#636E72]">Complete nodes to progress</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 bg-[#6C5CE7] text-white px-4 py-2 rounded-xl font-bold shadow-lg shadow-[#6C5CE7]/30"
          >
            <Upload className="w-5 h-5" />
            Upload
          </motion.button>
        </div>
      </div>

      {/* Worlds */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-8">
        {worlds.map((world) => {
          const isWorldLocked = world.position > 1;
          const prevWorldCompleted = world.position <= 1 || userNodes.some(
            (un) =>
              un.status === 'completed' &&
              nodes.find((n) => n.id === un.node_id && n.world_id === worlds[world.position - 2]?.id)
          );

          return (
            <motion.div
              key={world.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: world.position * 0.1 }}
            >
              <PathWorld
                world={world}
                nodes={nodes}
                userNodes={userNodes}
                onNodeClick={handleNodeClick}
                isLocked={isWorldLocked && !prevWorldCompleted}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Floating upload button (mobile) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowUpload(true)}
        className="fixed bottom-24 right-4 w-14 h-14 bg-[#6C5CE7] text-white rounded-full shadow-xl shadow-[#6C5CE7]/30 flex items-center justify-center z-50 md:hidden"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Upload Modal */}
      <UploadModal isOpen={showUpload} onClose={() => setShowUpload(false)} />

      {/* Activity Modal */}
      {currentNode && activitySession && (
        <ActivityModal
          isOpen={showActivity}
          onClose={handleCloseActivity}
        />
      )}
    </div>
  );
}
