import React from 'react';
import { MentorMood } from '../../types/game';

interface MentorAvatarProps {
  mood: MentorMood;
  size?: 'sm' | 'md' | 'lg';
}

export const MentorAvatar: React.FC<MentorAvatarProps> = ({ mood, size = 'md' }) => {
  const getMoodEmoji = () => {
    switch (mood) {
      case 'CELEBRATING':
        return '🎉';
      case 'EXCITED':
        return '🚀';
      case 'TEACHING':
        return '💡';
      case 'THINKING':
        return '🧐';
      default:
        return '✨';
    }
  };

  const getBorderColor = () => {
    switch (mood) {
      case 'CELEBRATING':
        return 'border-amber-400 shadow-amber-200';
      case 'EXCITED':
        return 'border-emerald-500 shadow-emerald-200';
      case 'TEACHING':
        return 'border-blue-500 shadow-blue-200';
      case 'THINKING':
        return 'border-purple-400 shadow-purple-200';
      default:
        return 'border-slate-300 shadow-slate-200';
    }
  };

  const sizeClasses = {
    sm: 'w-10 h-10 text-xl',
    md: 'w-13 h-13 text-2xl',
    lg: 'w-18 h-18 text-3xl',
  }[size];

  return (
    <div className="relative inline-block select-none flex-shrink-0">
      {/* Glow e Avatar em Fundo Claro */}
      <div
        className={`${sizeClasses} rounded-2xl bg-gradient-to-br from-blue-50 via-slate-50 to-emerald-50 border-2 ${getBorderColor()} shadow-md flex items-center justify-center transition-all duration-300 transform hover:scale-105`}
      >
        <span className="animate-pulse-subtle">🦉</span>
      </div>

      {/* Badge do Humor */}
      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-xs">
        {getMoodEmoji()}
      </div>
    </div>
  );
};
