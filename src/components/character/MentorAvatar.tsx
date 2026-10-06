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
        return 'border-amber-400 shadow-amber-500/30';
      case 'EXCITED':
        return 'border-emerald-400 shadow-emerald-500/30';
      case 'TEACHING':
        return 'border-blue-400 shadow-blue-500/30';
      case 'THINKING':
        return 'border-purple-400 shadow-purple-500/30';
      default:
        return 'border-slate-500 shadow-slate-500/20';
    }
  };

  const sizeClasses = {
    sm: 'w-10 h-10 text-xl',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-20 h-20 text-4xl',
  }[size];

  return (
    <div className="relative inline-block select-none">
      {/* Glow e Avatar */}
      <div
        className={`${sizeClasses} rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-emerald-950 border-2 ${getBorderColor()} shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105`}
      >
        <span className="animate-pulse-subtle">🦉</span>
      </div>

      {/* Badge do Humor */}
      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 shadow flex items-center justify-center text-xs">
        {getMoodEmoji()}
      </div>
    </div>
  );
};
