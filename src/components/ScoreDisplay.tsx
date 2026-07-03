import React from 'react';
import { Trophy, Target, TrendingUp, Star, Award, Zap } from 'lucide-react';
import type { GameScore } from '../types';

interface ScoreDisplayProps {
  score: GameScore;
  showDetails?: boolean;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, showDetails = true }) => {
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'from-green-500 to-emerald-500';
    if (percentage >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getScoreTextColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return { message: 'Excelente!', icon: Award, emoji: '🎉' };
    if (percentage >= 80) return { message: 'Muito bom!', icon: Trophy, emoji: '👏' };
    if (percentage >= 60) return { message: 'Bom trabalho!', icon: Star, emoji: '👍' };
    return { message: 'Continue praticando!', icon: Zap, emoji: '💪' };
  };

  const scoreInfo = getScoreMessage(score.percentage);

  return (
    <div className="score-display relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl" />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Sua Pontuação</h3>
        <div className={`p-2 rounded-full bg-gradient-to-r ${getScoreColor(score.percentage)}`}>
          <Trophy className="h-6 w-6 text-white" />
        </div>
      </div>
      
      {/* Score Circle */}
      <div className="relative z-10 text-center mb-6">
        <div className="relative inline-block">
          <div className="w-32 h-32 mx-auto mb-4 relative">
            {/* Background circle */}
            <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
            
            {/* Progress circle */}
            <div 
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${getScoreColor(score.percentage)} opacity-20`}
              style={{
                background: `conic-gradient(from 0deg, transparent 0%, transparent ${(100 - score.percentage) * 3.6}deg, rgba(59, 130, 246, 0.3) ${(100 - score.percentage) * 3.6}deg)`
              }}
            ></div>
            
            {/* Score text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreTextColor(score.percentage)}`}>
                  {score.percentage}%
                </div>
              </div>
            </div>
          </div>
          
          {/* Message */}
          <div className="flex items-center justify-center space-x-2">
            <scoreInfo.icon className={`h-5 w-5 ${getScoreTextColor(score.percentage)}`} />
            <span className="text-lg font-semibold text-gray-700">
              {scoreInfo.message} {scoreInfo.emoji}
            </span>
          </div>
        </div>
      </div>
      
      {/* Details Grid */}
      {showDetails && (
        <div className="relative z-10 grid grid-cols-2 gap-4 pt-6 border-t border-gray-200/50">
          <div className="text-center">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200/50">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Corretas</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{score.correct}</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200/50">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Total</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{score.total}</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Progress Bar */}
      <div className="relative z-10 mt-6">
        <div className="progress-bar">
          <div 
            className={`progress-fill animate-pulse-success`}
            style={{ width: `${score.percentage}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;