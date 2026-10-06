import React from 'react';
import { GameState } from '../../types/game';
import { Award, Zap, HelpCircle } from 'lucide-react';

interface MissionTrackerProps {
  gameState: GameState;
  onOpenTour: () => void;
}

export const MissionTracker: React.FC<MissionTrackerProps> = ({ gameState, onOpenTour }) => {
  return (
    <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/60 rounded-xl px-3 py-1.5 shadow-sm backdrop-blur">
      {/* Nível do Jogador */}
      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
        <Award className="w-4 h-4 text-amber-400" />
        <span>Nível {gameState.level}</span>
        <span className="hidden sm:inline text-slate-400 font-normal">({gameState.levelTitle})</span>
      </div>

      <div className="h-4 w-[1px] bg-slate-700 hidden sm:block" />

      {/* Pontuação de XP */}
      <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
        <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
        <span>{gameState.totalXp} XP</span>
      </div>

      <div className="h-4 w-[1px] bg-slate-700" />

      {/* Botão de Tour do Mentor */}
      <button
        onClick={onOpenTour}
        className="flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-700/60 hover:bg-slate-700 px-2.5 py-1 rounded-lg transition-colors"
      >
        <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
        <span>Tour do Mentor</span>
      </button>
    </div>
  );
};
