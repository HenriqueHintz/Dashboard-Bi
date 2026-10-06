import React from 'react';
import { TourMission, GameState } from '../../types/game';
import { MentorAvatar } from './MentorAvatar';
import { Sparkles, ArrowRight, ArrowLeft, X, Award, RotateCcw } from 'lucide-react';

interface DialogueBoxProps {
  mission: TourMission;
  gameState: GameState;
  totalMissions: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  onReset: () => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  mission,
  gameState,
  totalMissions,
  onNext,
  onPrev,
  onClose,
  onReset,
}) => {
  const isFirst = gameState.currentMissionIndex === 0;
  const isLast = gameState.currentMissionIndex === totalMissions - 1;
  const progressPercent = ((gameState.currentMissionIndex + 1) / totalMissions) * 100;

  return (
    <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md border-2 border-emerald-500/40 rounded-2xl p-5 shadow-2xl shadow-emerald-950/40 transition-all duration-300">
      {/* Barra de Progresso Superior da Missão */}
      <div className="w-full bg-slate-800/80 rounded-full h-1.5 mb-4 overflow-hidden border border-slate-700/50">
        <div
          className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-1.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <MentorAvatar mood={mission.mentorMood} size="md" />

        {/* Conteúdo */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Fin, Mentor Financeiro
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> +{mission.xpReward} XP
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              title="Fechar tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-base font-bold text-slate-100 flex items-center gap-1.5 mb-2">
            <span>{mission.title}</span>
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed mb-3 font-normal">
            {mission.speech}
          </p>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 mb-4">
            <div className="flex items-start gap-2 text-xs text-emerald-300/90 font-medium">
              <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-emerald-400">Dica Prática:</strong> {mission.practicalTask}
              </span>
            </div>
          </div>

          {/* Rodapé com Navegação */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">
                Etapa {gameState.currentMissionIndex + 1} de {totalMissions}
              </span>
              <span>•</span>
              <span className="text-amber-400 font-bold">{gameState.totalXp} XP</span>
              <button
                onClick={onReset}
                className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 ml-2 transition-colors"
                title="Reiniciar tour desde o começo"
              >
                <RotateCcw className="w-3 h-3" /> Reiniciar
              </button>
            </div>

            <div className="flex items-center gap-2">
              {!isFirst && (
                <button
                  onClick={onPrev}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Anterior
                </button>
              )}
              <button
                onClick={onNext}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-700/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLast ? 'Concluir Tour 🏆' : 'Avançar Missão'} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
