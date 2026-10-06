export type MentorMood = 'NEUTRAL' | 'EXCITED' | 'TEACHING' | 'THINKING' | 'CELEBRATING';

export interface TourMission {
  id: number;
  title: string;
  badge: string;
  xpReward: number;
  highlightTab: 'BUDGET' | 'EMERGENCY' | 'INVESTMENTS' | 'GLOSSARY';
  mentorMood: MentorMood;
  speech: string;
  practicalTask: string;
  conceptKey: string;
}

export interface GameState {
  currentMissionIndex: number;
  isTourActive: boolean;
  totalXp: number;
  level: number;
  levelTitle: string;
  completedMissions: number[];
  unlockedAchievements: string[];
}
