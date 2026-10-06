import React from 'react';
import { TourMission, GameState } from '../../types/game';
import { MentorAvatar } from './MentorAvatar';
import { Sparkles, ArrowRight, ArrowLeft, X, Award, RotateCcw, Lightbulb } from 'lucide-react';

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
    <div className="relative bg-white border border-blue-200/90 rounded-2xl p-4 sm:p-5 shadow-sm shadow-blue-100/50 transition-all duration-300">
      {/* Barra de Progresso Superior da Missão */}
      <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 h-1.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex items-start gap-3 sm:gap-4">
        {/* Avatar */}
        <MentorAvatar mood={mission.mentorMood} size="md" />

        {/* Conteúdo Didático */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Fin, Mentor Financeiro
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> +{mission.xpReward} XP
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              title="Fechar tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {mission.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            {mission.speech}
          </p>

          {/* Card de Ação Didática Prática */}
          <div className="mt-3 bg-blue-50/70 border border-blue-100 rounded-xl p-3 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700">
              <span className="font-bold text-blue-900">Missão Prática: </span>
              {mission.practicalTask}
            </div>
          </div>

          {/* Barra de Controles Inferiores */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Etapa {gameState.currentMissionIndex + 1} de {totalMissions}</span>
              {gameState.completedMissions.includes(mission.id) && (
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <Award className="w-3 h-3 text-emerald-600" /> Concluída!
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!isFirst && (
                <button
                  onClick={onPrev}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Anterior</span>
                </button>
              )}

              <button
                onClick={onNext}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-lg transition-all shadow-sm shadow-blue-500/20"
              >
                <span>{isLast ? 'Finalizar Tour 🎉' : 'Próxima Etapa'}</span>
                {!isLast && <ArrowRight className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={onReset}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                title="Reiniciar tour do início"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
