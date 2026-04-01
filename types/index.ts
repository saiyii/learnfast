// User types
export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  language: 'en' | 'fr' | 'es';
  created_at: string;
}

export interface UserProgress {
  user_id: string;
  level: number;
  xp: number;
  total_xp: number;
  hearts: number;
  max_hearts: number;
  heart_refill_at: string;
  streak: number;
  streak_freeze_count: number;
  coins: number;
  gems: number;
  last_activity_at: string;
}

// Node types
export type NodeType = 'standard' | 'boss' | 'review' | 'reward';
export type NodeStatus = 'locked' | 'available' | 'completed';

export interface Node {
  id: string;
  world_id: string;
  position: number;
  type: NodeType;
  difficulty: 'easy' | 'medium' | 'hard';
  content?: ExerciseContent;
  created_at: string;
}

export interface World {
  id: string;
  name: string;
  position: number;
  node_count: number;
}

export interface UserNode {
  user_id: string;
  node_id: string;
  status: NodeStatus;
  attempts: number;
  best_score?: number;
  completed_at?: string;
}

// Exercise types
export type ExerciseType = 'multiple_choice' | 'fill_blank' | 'true_false' | 'matching' | 'ordering';

export interface ExerciseContent {
  question: string;
  type: ExerciseType;
  options?: string[];
  correct_answer: string | number;
  hint?: string;
}

export interface Exercise {
  id: string;
  node_id: string;
  type: ExerciseType;
  question: string;
  options?: string[];
  correct_answer: string | number;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at: string;
}

export interface UserExercise {
  user_id: string;
  exercise_id: string;
  answered_correctly?: boolean;
  answered_at: string;
}

// Quest types
export type QuestType = 'daily' | 'weekly';

export interface Quest {
  id: string;
  type: QuestType;
  title: string;
  description: string;
  target: number;
  reward_coins: number;
  reward_gems?: number;
  reset_at: string;
}

export interface UserQuest {
  user_id: string;
  quest_id: string;
  progress: number;
  completed: boolean;
  claimed_at?: string;
}

// Achievement types
export interface Achievement {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  reward_coins: number;
  reward_gems?: number;
}

export interface UserAchievement {
  user_id: string;
  achievement_id: string;
  earned_at: string;
}

// Leaderboard types
export type Tier = 'bronze' | 'silver' | 'gold' | 'diamond';

export interface LeaderboardEntry {
  user_id: string;
  username: string;
  avatar_url?: string;
  xp_earned: number;
  rank: number;
  tier: Tier;
  week_start: string;
}

// Shop types
export type ShopItemType = 'powerup' | 'cosmetic' | 'currency';

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  type: ShopItemType;
  price_coins?: number;
  price_gems?: number;
  effect_type: string;
  effect_value: number;
  duration?: number; // in minutes, for time-limited items
  icon: string;
}

// Notification types
export interface Notification {
  id: string;
  user_id: string;
  type: 'streak_warning' | 'quest_complete' | 'leaderboard_update' | 'level_up' | 'achievement';
  title: string;
  body: string;
  read: boolean;
  created_at: string;
}

// Activity session
export interface ActivitySession {
  node_id: string;
  exercises: Exercise[];
  current_index: number;
  correct_count: number;
  wrong_count: number;
  start_time: string;
  xp_earned: number;
  coins_earned: number;
  hearts_remaining: number;
  completed: boolean;
}

// Game state for Zustand
export interface GameState {
  user: User | null;
  progress: UserProgress | null;
  currentWorld: World | null;
  nodes: Node[];
  userNodes: UserNode[];
  currentNode: Node | null;
  activitySession: ActivitySession | null;
  activeQuests: Quest[];
  userQuests: UserQuest[];
  dailyReset: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setProgress: (progress: UserProgress | null) => void;
  setNodes: (nodes: Node[], userNodes: UserNode[]) => void;
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
}
