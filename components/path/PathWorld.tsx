'use client';

import { motion } from 'framer-motion';
import { Lock, Check, Globe } from 'lucide-react';
import { PathNode } from './PathNode';
import type { World, Node, UserNode } from '@/types';

interface PathWorldProps {
  world: World;
  nodes: Node[];
  userNodes: UserNode[];
  onNodeClick: (node: Node) => void;
  isLocked?: boolean;
}

export function PathWorld({ world, nodes, userNodes, onNodeClick, isLocked = false }: PathWorldProps) {
  const worldNodes = nodes.filter((n) => n.world_id === world.id);
  const completedCount = userNodes.filter(
    (un) => un.status === 'completed' && worldNodes.some((n) => n.id === un.node_id)
  ).length;
  const progress = (completedCount / worldNodes.length) * 100;

  return (
    <div className={`relative ${isLocked ? 'opacity-50' : ''}`}>
      {/* World header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isLocked ? 'bg-[#DFE6E9]' : 'bg-[#6C5CE7]'
          }`}
        >
          {isLocked ? (
            <Lock className="w-5 h-5 text-[#636E72]" />
          ) : (
            <Globe className="w-5 h-5 text-white" />
          )}
        </div>
        <div className="flex-1">
          <h3 className={`font-bold ${isLocked ? 'text-[#636E72]' : 'text-[#2D3436]'}`}>
            {world.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-[#DFE6E9] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#6C5CE7] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <span className="text-xs text-[#636E72] font-mono">
              {completedCount}/{worldNodes.length}
            </span>
          </div>
        </div>
      </div>

      {/* Nodes path */}
      <div className="flex flex-wrap gap-4 justify-center">
        {worldNodes.map((node, index) => {
          const userNode = userNodes.find((un) => un.node_id === node.id) || {
            node_id: node.id,
            user_id: 'demo',
            status: 'locked',
            attempts: 0,
          };

          return (
            <PathNode
              key={node.id}
              node={node}
              userNode={userNode}
              index={index}
              onClick={onNodeClick}
            />
          );
        })}
      </div>
    </div>
  );
}
