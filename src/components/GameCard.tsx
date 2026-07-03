import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Clock, Star, ArrowRight, Zap } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  difficulty: string;
  estimatedTime: string;
  color: string;
  onClick: () => void;
  score?: number;
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  icon: Icon,
  difficulty,
  estimatedTime,
  color,
  onClick,
  score
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Iniciante':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Avançado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div 
      className="game-card group relative p-6 cursor-pointer overflow-hidden"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      aria-label={`Jogar ${title} - ${difficulty} - ${estimatedTime}`}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="relative">
            <div className={`p-4 rounded-2xl ${color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
              <Zap className="h-3 w-3 text-yellow-500" />
            </div>
          </div>
          
          {score !== undefined && (
            <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getScoreColor(score)} shadow-sm`}>
              <Star className="h-3 w-3 inline mr-1" />
              {score}%
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {description}
            </p>
          </div>
          
          {/* Metadata */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(difficulty)}`}>
                {difficulty}
              </span>
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock className="h-3 w-3" />
                <span className="text-xs">{estimatedTime}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-gray-100/50">
          <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl">
            <span>Começar Jogo</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
};

export default GameCard;