import React from 'react';
import { GameState } from '../../types/game';
import { Award, Zap, HelpCircle } from 'lucide-react';

interface MissionTrackerProps {
  gameState: GameState;
  onOpenTour: () => void;
}

export const MissionTracker: React.FC<MissionTrackerProps> = ({ gameState, onOpenTour }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm">
      {/* Nível do Jogador */}
      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
        <Award className="w-4 h-4 text-amber-500" />
        <span>Nível {gameState.level}</span>
        <span className="hidden md:inline text-slate-500 font-normal">({gameState.levelTitle})</span>
      </div>

      <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />

      {/* Pontuação de XP */}
      <div className="flex items-center gap-1 text-xs font-semibold text-blue-700">
        <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
        <span>{gameState.totalXp} XP</span>
      </div>

      <div className="h-4 w-[1px] bg-slate-200" />

      {/* Botão de Tour do Mentor */}
      <button
        onClick={onOpenTour}
        className="flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-lg transition-colors"
      >
        <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
        <span className="font-semibold">Tour Guiado</span>
      </button>
    </div>
  );
};
