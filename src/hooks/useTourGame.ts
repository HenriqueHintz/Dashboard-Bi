import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { GameState, TourMission } from '../types/game';
import { TOUR_MISSIONS } from '../data/missions';
import { sound } from '../utils/audioEffects';

export function useTourGame(onTabChange?: (tab: 'BUDGET' | 'EMERGENCY' | 'INVESTMENTS' | 'GLOSSARY') => void) {
  const [gameState, setGameState] = useState<GameState>({
    currentMissionIndex: 0,
    isTourActive: true,
    totalXp: 0,
    level: 1,
    levelTitle: 'Iniciante nas Finanças',
    completedMissions: [],
    unlockedAchievements: [],
  });

  const currentMission: TourMission = TOUR_MISSIONS[gameState.currentMissionIndex] || TOUR_MISSIONS[0];

  const calculateLevel = (xp: number) => {
    if (xp >= 1200) return { level: 5, title: '👑 Mestre da Liberdade Financeira' };
    if (xp >= 800) return { level: 4, title: '📈 Investidor Estrategista' };
    if (xp >= 500) return { level: 3, title: '🏰 Guardião da Reserva' };
    if (xp >= 200) return { level: 2, title: '🛡️ Poupador Consciente' };
    return { level: 1, title: '🌱 Aventureiro das Contas' };
  };

  const nextMission = useCallback(() => {
    sound.playClick();
    setGameState((prev) => {
      const isAlreadyCompleted = prev.completedMissions.includes(currentMission.id);
      const newXp = isAlreadyCompleted ? prev.totalXp : prev.totalXp + currentMission.xpReward;
      const { level, title } = calculateLevel(newXp);

      if (!isAlreadyCompleted) {
        sound.playMissionComplete();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
        });
      }

      if (level > prev.level) {
        sound.playLevelUp();
      }

      const nextIdx = Math.min(TOUR_MISSIONS.length - 1, prev.currentMissionIndex + 1);
      const nextMissionItem = TOUR_MISSIONS[nextIdx];

      if (onTabChange && nextMissionItem) {
        onTabChange(nextMissionItem.highlightTab);
      }

      return {
        ...prev,
        currentMissionIndex: nextIdx,
        totalXp: newXp,
        level,
        levelTitle: title,
        completedMissions: isAlreadyCompleted
          ? prev.completedMissions
          : [...prev.completedMissions, currentMission.id],
      };
    });
  }, [currentMission, onTabChange]);

  const prevMission = useCallback(() => {
    sound.playClick();
    setGameState((prev) => {
      const prevIdx = Math.max(0, prev.currentMissionIndex - 1);
      const prevMissionItem = TOUR_MISSIONS[prevIdx];
      if (onTabChange && prevMissionItem) {
        onTabChange(prevMissionItem.highlightTab);
      }
      return {
        ...prev,
        currentMissionIndex: prevIdx,
      };
    });
  }, [onTabChange]);

  const jumpToMission = useCallback((index: number) => {
    sound.playClick();
    const mission = TOUR_MISSIONS[index];
    if (mission && onTabChange) {
      onTabChange(mission.highlightTab);
    }
    setGameState((prev) => ({
      ...prev,
      currentMissionIndex: index,
      isTourActive: true,
    }));
  }, [onTabChange]);

  const toggleTour = useCallback(() => {
    sound.playClick();
    setGameState((prev) => ({
      ...prev,
      isTourActive: !prev.isTourActive,
    }));
  }, []);

  const resetTour = useCallback(() => {
    sound.playClick();
    if (onTabChange) {
      onTabChange(TOUR_MISSIONS[0].highlightTab);
    }
    setGameState({
      currentMissionIndex: 0,
      isTourActive: true,
      totalXp: 0,
      level: 1,
      levelTitle: '🌱 Aventureiro das Contas',
      completedMissions: [],
      unlockedAchievements: [],
    });
  }, [onTabChange]);

  return {
    gameState,
    currentMission,
    totalMissions: TOUR_MISSIONS.length,
    nextMission,
    prevMission,
    jumpToMission,
    toggleTour,
    resetTour,
  };
}
