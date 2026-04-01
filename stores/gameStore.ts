import { create } from 'zustand';
import type {
  User,
  UserProgress,
  Node,
  UserNode,
  World,
  Exercise,
  Quest,
  UserQuest,
  ActivitySession,
} from '@/types';

interface GameState {
  // User data
  user: User | null;
  progress: UserProgress | null;
  language: 'en' | 'fr' | 'es';

  // Path data
  worlds: World[];
  nodes: Node[];
  userNodes: UserNode[];
  currentWorld: World | null;
  currentNode: Node | null;

  // Activity session
  activitySession: ActivitySession | null;

  // Quests
  activeQuests: Quest[];
  userQuests: UserQuest[];

  // UI state
  isLoading: boolean;
  showLevelUp: boolean;
  newLevel: number;
  showChest: boolean;
  chestReward: { type: string; amount: number } | null;

  // Actions
  setUser: (user: User | null) => void;
  setProgress: (progress: UserProgress | null) => void;
  setLanguage: (lang: 'en' | 'fr' | 'es') => void;
  setWorlds: (worlds: World[]) => void;
  setNodes: (nodes: Node[], userNodes: UserNode[]) => void;
  setCurrentWorld: (world: World | null) => void;
  setCurrentNode: (node: Node | null) => void;
  startActivity: (node: Node) => void;
  answerExercise: (correct: boolean) => void;
  completeActivity: () => void;
  updateHearts: (hearts: number) => void;
  addXP: (xp: number) => void;
  addCoins: (coins: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  useStreakFreeze: () => boolean;
  setQuests: (quests: Quest[], userQuests: UserQuest[]) => void;
  updateQuestProgress: (questId: string, progress: number) => void;
  claimQuest: (questId: string) => void;
  setLoading: (loading: boolean) => void;
  setShowLevelUp: (show: boolean, level?: number) => void;
  setShowChest: (show: boolean, reward?: { type: string; amount: number } | null) => void;
  refillHearts: () => void;
}

// Calculate XP needed for a level
const xpForLevel = (level: number): number => level * 100;

// Check for level up
const checkLevelUp = (currentXP: number, currentLevel: number): { leveled: boolean; newLevel: number; xpWithin: number } => {
  let xp = currentXP;
  let level = currentLevel;

  while (xp >= xpForLevel(level)) {
    xp -= xpForLevel(level);
    level++;
  }

  return {
    leveled: level > currentLevel,
    newLevel: level,
    xpWithin: xp,
  };
};

// Generate mock data for demo
const generateMockWorlds = (): World[] => [
  { id: 'w1', name: 'World 1', position: 1, node_count: 10 },
  { id: 'w2', name: 'World 2', position: 2, node_count: 10 },
  { id: 'w3', name: 'World 3', position: 3, node_count: 10 },
  { id: 'w4', name: 'World 4', position: 4, node_count: 10 },
  { id: 'w5', name: 'World 5', position: 5, node_count: 10 },
];

const generateMockNodes = (): Node[] => {
  const nodes: Node[] = [];
  const nodeTypes: Array<'standard' | 'boss' | 'review' | 'reward'> = ['standard', 'standard', 'standard', 'review', 'standard', 'boss', 'standard', 'review', 'standard', 'reward'];

  for (let world = 1; world <= 5; world++) {
    for (let pos = 1; pos <= 10; pos++) {
      const index = (world - 1) * 10 + pos;
      const type = nodeTypes[pos - 1];
      nodes.push({
        id: `node_${world}_${pos}`,
        world_id: `w${world}`,
        position: pos,
        type,
        difficulty: type === 'boss' ? 'hard' : type === 'review' ? 'medium' : 'easy',
        created_at: new Date().toISOString(),
      });
    }
  }
  return nodes;
};

const generateMockUserNodes = (): UserNode[] => {
  const userNodes: UserNode[] = [];

  // First 5 nodes completed
  for (let i = 1; i <= 5; i++) {
    userNodes.push({
      user_id: 'demo',
      node_id: `node_1_${i}`,
      status: 'completed',
      attempts: 1,
      best_score: 100,
      completed_at: new Date().toISOString(),
    });
  }

  // Node 6 is available (current)
  userNodes.push({
    user_id: 'demo',
    node_id: 'node_1_6',
    status: 'available',
    attempts: 0,
  });

  // Rest are locked
  for (let world = 1; world <= 5; world++) {
    for (let pos = (world === 1 ? 7 : 1); pos <= 10; pos++) {
      const nodeId = `node_${world}_${pos}`;
      if (!userNodes.find(un => un.node_id === nodeId)) {
        userNodes.push({
          user_id: 'demo',
          node_id: nodeId,
          status: 'locked',
          attempts: 0,
        });
      }
    }
  }

  return userNodes;
};

const generateMockExercises = (nodeId: string): Exercise[] => {
  const baseQuestions = [
    { q: 'What is the capital of France?', options: ['London', 'Paris', 'Berlin', 'Madrid'], correct: 1 },
    { q: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correct: 1 },
    { q: 'What color is the sky?', options: ['Red', 'Green', 'Blue', 'Yellow'], correct: 2 },
    { q: 'What is H2O commonly known as?', options: ['Salt', 'Sugar', 'Water', 'Oxygen'], correct: 2 },
    { q: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correct: 1 },
  ];

  return baseQuestions.slice(0, 3).map((q, i) => ({
    id: `${nodeId}_ex_${i}`,
    node_id: nodeId,
    type: 'multiple_choice' as const,
    question: q.q,
    options: q.options,
    correct_answer: q.correct,
    difficulty: 'easy' as const,
    created_at: new Date().toISOString(),
  }));
};

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  user: null,
  progress: {
    user_id: 'demo',
    level: 5,
    xp: 250,
    total_xp: 1250,
    hearts: 4,
    max_hearts: 5,
    heart_refill_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    streak: 7,
    streak_freeze_count: 1,
    coins: 1250,
    gems: 5,
    last_activity_at: new Date().toISOString(),
  },
  language: 'en',
  worlds: generateMockWorlds(),
  nodes: generateMockNodes(),
  userNodes: generateMockUserNodes(),
  currentWorld: generateMockWorlds()[0],
  currentNode: null,
  activitySession: null,
  activeQuests: [
    { id: 'q1', type: 'daily', title: 'Complete 3 activities', description: 'Complete 3 lessons', target: 3, reward_coins: 20, reset_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() },
    { id: 'q2', type: 'daily', title: 'Earn 50 XP', description: 'Gain 50 XP today', target: 50, reward_coins: 15, reset_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() },
    { id: 'q3', type: 'weekly', title: 'Complete 50 activities', description: 'Complete 50 lessons this week', target: 50, reward_coins: 100, reward_gems: 1, reset_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() },
  ],
  userQuests: [
    { user_id: 'demo', quest_id: 'q1', progress: 1, completed: false },
    { user_id: 'demo', quest_id: 'q2', progress: 30, completed: false },
    { user_id: 'demo', quest_id: 'q3', progress: 25, completed: false },
  ],
  isLoading: false,
  showLevelUp: false,
  newLevel: 5,
  showChest: false,
  chestReward: null,

  // Actions
  setUser: (user) => set({ user }),
  setProgress: (progress) => set({ progress }),
  setLanguage: (language) => set({ language }),
  setWorlds: (worlds) => set({ worlds }),
  setNodes: (nodes, userNodes) => set({ nodes, userNodes }),
  setCurrentWorld: (world) => set({ currentWorld: world }),
  setCurrentNode: (node) => set({ currentNode: node }),

  startActivity: (node) => {
    const exercises = generateMockExercises(node.id);
    set({
      currentNode: node,
      activitySession: {
        node_id: node.id,
        exercises,
        current_index: 0,
        correct_count: 0,
        wrong_count: 0,
        start_time: new Date().toISOString(),
        xp_earned: 0,
        coins_earned: 0,
        hearts_remaining: get().progress?.hearts ?? 5,
        completed: false,
      },
    });
  },

  answerExercise: (correct) => {
    const session = get().activitySession;
    const progress = get().progress;
    if (!session || !progress) return;

    const newSession = { ...session };
    newSession.current_index++;
    newSession.hearts_remaining = correct ? newSession.hearts_remaining : newSession.hearts_remaining - 1;

    if (correct) {
      newSession.correct_count++;
      const earnedXP = 10;
      newSession.xp_earned += earnedXP;
    } else {
      newSession.wrong_count++;
    }

    // Check if activity is complete
    if (newSession.current_index >= newSession.exercises.length || newSession.hearts_remaining <= 0) {
      newSession.completed = true;
    }

    set({ activitySession: newSession });
  },

  completeActivity: () => {
    const session = get().activitySession;
    const progress = get().progress;
    if (!session || !progress) return;

    const xpGained = session.xp_earned;
    const coinsGained = Math.floor(Math.random() * 10) + 5;
    const perfectBonus = session.correct_count === session.exercises.length ? 5 : 0;

    const newXP = progress.xp + xpGained + perfectBonus;
    const { leveled, newLevel, xpWithin } = checkLevelUp(newXP, progress.level);

    // Update user nodes
    const nodeId = session.node_id;
    const userNodes = get().userNodes.map(un =>
      un.node_id === nodeId
        ? { ...un, status: 'completed' as const, best_score: Math.round((session.correct_count / session.exercises.length) * 100), completed_at: new Date().toISOString() }
        : un
    );

    // Unlock next node
    const currentIndex = get().nodes.findIndex(n => n.id === nodeId);
    if (currentIndex >= 0 && currentIndex < get().nodes.length - 1) {
      const nextNodeId = get().nodes[currentIndex + 1].id;
      const nextNodeIndex = userNodes.findIndex(un => un.node_id === nextNodeId);
      if (nextNodeIndex >= 0) {
        userNodes[nextNodeIndex] = { ...userNodes[nextNodeIndex], status: 'available' };
      }
    }

    set({
      progress: {
        ...progress,
        xp: xpWithin,
        total_xp: progress.total_xp + xpGained + perfectBonus,
        level: newLevel,
        hearts: session.hearts_remaining,
        coins: progress.coins + coinsGained,
      },
      userNodes,
      activitySession: null,
      currentNode: null,
      showLevelUp: leveled,
      newLevel: newLevel,
      showChest: Math.random() < 0.2, // 20% chest chance
      chestReward: Math.random() < 0.2 ? { type: 'coins', amount: coinsGained } : null,
    });

    // Update quest progress
    const quests = get().activeQuests;
    const userQuests = get().userQuests;
    quests.forEach(quest => {
      const uqIndex = userQuests.findIndex(uq => uq.quest_id === quest.id);
      if (uqIndex >= 0) {
        const newProgress = userQuests[uqIndex].progress + 1;
        const completed = newProgress >= quest.target;
        get().updateQuestProgress(quest.id, newProgress);
        if (completed && !userQuests[uqIndex].completed) {
          get().claimQuest(quest.id);
        }
      }
    });
  },

  updateHearts: (hearts) => {
    const progress = get().progress;
    if (!progress) return;
    set({ progress: { ...progress, hearts: Math.max(0, Math.min(hearts, progress.max_hearts)) } });
  },

  addXP: (xp) => {
    const progress = get().progress;
    if (!progress) return;
    const newXP = progress.xp + xp;
    const { leveled, newLevel, xpWithin } = checkLevelUp(newXP, progress.level);
    set({
      progress: { ...progress, xp: xpWithin, total_xp: progress.total_xp + xp, level: newLevel },
      showLevelUp: leveled,
      newLevel: newLevel,
    });
  },

  addCoins: (coins) => {
    const progress = get().progress;
    if (!progress) return;
    set({ progress: { ...progress, coins: progress.coins + coins } });
  },

  incrementStreak: () => {
    const progress = get().progress;
    if (!progress) return;
    set({ progress: { ...progress, streak: progress.streak + 1, last_activity_at: new Date().toISOString() } });
  },

  resetStreak: () => {
    const progress = get().progress;
    if (!progress) return;
    set({ progress: { ...progress, streak: 0 } });
  },

  useStreakFreeze: () => {
    const progress = get().progress;
    if (!progress || progress.streak_freeze_count <= 0) return false;
    set({ progress: { ...progress, streak_freeze_count: progress.streak_freeze_count - 1 } });
    return true;
  },

  setQuests: (quests, userQuests) => set({ activeQuests: quests, userQuests }),

  updateQuestProgress: (questId, progress) => {
    const userQuests = get().userQuests.map(uq =>
      uq.quest_id === questId ? { ...uq, progress } : uq
    );
    set({ userQuests });
  },

  claimQuest: (questId) => {
    const userQuests = get().userQuests.map(uq =>
      uq.quest_id === questId ? { ...uq, completed: true, claimed_at: new Date().toISOString() } : uq
    );
    const quest = get().activeQuests.find(q => q.id === questId);
    const progress = get().progress;
    if (quest && progress) {
      set({
        userQuests,
        progress: {
          ...progress,
          coins: progress.coins + quest.reward_coins,
          gems: progress.gems + (quest.reward_gems ?? 0),
        },
      });
    } else {
      set({ userQuests });
    }
  },

  setLoading: (isLoading) => set({ isLoading }),
  setShowLevelUp: (show, level) => set({ showLevelUp: show, newLevel: level ?? get().newLevel }),
  setShowChest: (show, reward) => set({ showChest: show, chestReward: reward }),

  refillHearts: () => {
    const progress = get().progress;
    if (!progress) return;
    set({
      progress: {
        ...progress,
        hearts: progress.max_hearts,
        heart_refill_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      },
    });
  },
}));
