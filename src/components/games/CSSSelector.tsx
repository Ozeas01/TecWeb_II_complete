import React, { useState } from 'react';
import { Check, X, RotateCcw, Trophy, Eye, Code } from 'lucide-react';
import { cssChallenges } from '../../data/gameData';
import type { GameScore } from '../../types';
import ScoreDisplay from '../ScoreDisplay';

interface CSSSelectorProps {
  onGameComplete: (score: GameScore) => void;
}

const CSSSelector: React.FC<CSSSelectorProps> = ({ onGameComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState<GameScore>({ correct: 0, total: 0, percentage: 0 });
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [gameStarted, setGameStarted] = useState(false);
  
  // Filtra desafios pela dificuldade selecionada
  const filteredChallenges = cssChallenges.filter(c => c.difficulty === difficulty);
  const currentChallenge = filteredChallenges[currentQuestion];

  const getDifficultyLabel = (diff: string) => {
    switch (diff) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return diff;
    }
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    const newAnswers = [...answers, userAnswer];
    setAnswers(newAnswers);
    setShowFeedback(true);

    setTimeout(() => {
      if (currentQuestion < filteredChallenges.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setUserAnswer('');
        setShowFeedback(false);
      } else {
        calculateScore(newAnswers);
      }
    }, 2000);
  };

  const calculateScore = (userAnswers: string[]) => {
    const correct = userAnswers.filter((answer, index) => {
      const challenge = filteredChallenges[index];
      return answer.trim().toLowerCase() === challenge.selector.toLowerCase();
    }).length;

    const total = filteredChallenges.length;
    const percentage = Math.round((correct / total) * 100);
    
    const newScore = { correct, total, percentage };
    setScore(newScore);
    setGameCompleted(true);
    
    setTimeout(() => {
      onGameComplete(newScore);
    }, 2000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setUserAnswer('');
    setAnswers([]);
    setShowFeedback(false);
    setGameCompleted(false);
    setScore({ correct: 0, total: 0, percentage: 0 });
    setGameStarted(false);
  };

  const isCorrect = showFeedback && 
    userAnswer.trim().toLowerCase() === currentChallenge?.selector.toLowerCase();

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/30 p-6 text-slate-800 flex flex-col justify-center items-center">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <div className="animate-bounce-in">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                CSS Selector Master Concluído!
              </h2>
              <p className="text-slate-500 font-medium">
                Você testou seus conhecimentos em seletores CSS
              </p>
            </div>
          </div>

          <div className="max-w-md mx-auto mb-8">
            <ScoreDisplay score={score} />
          </div>

          <div className="bg-white/85 backdrop-blur-sm rounded-2xl shadow-sm border border-blue-200 p-6 mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Revisão das Respostas</h3>
            <div className="space-y-3">
              {filteredChallenges.map((challenge, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer?.trim().toLowerCase() === challenge.selector.toLowerCase();
                
                return (
                  <div key={challenge.id} className={`p-3 rounded-lg border ${
                    isCorrect ? 'bg-emerald-50 border-emerald-250 text-emerald-800' : 'bg-rose-50 border-rose-250 text-rose-800'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-slate-700 mb-1">{challenge.description}</p>
                        <div className="font-mono text-sm">
                          <span className="text-slate-500">Sua resposta: </span>
                          <span className={isCorrect ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>
                            {userAnswer || 'Não respondido'}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="font-mono text-sm mt-1">
                            <span className="text-slate-500">Resposta correta: </span>
                            <span className="text-emerald-600 font-semibold">{challenge.selector}</span>
                          </div>
                        )}
                      </div>
                      {isCorrect ? (
                        <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-rose-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button onClick={resetGame} className="btn-secondary flex items-center space-x-2 bg-white text-slate-700 border-slate-200 hover:bg-slate-50 px-6 py-3 rounded-xl transition-all shadow-sm">
              <RotateCcw className="h-4 w-4" />
              <span>Jogar Novamente</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/30 p-6 text-slate-800 flex flex-col justify-center items-center">
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 bg-clip-text text-transparent">Selecione a Dificuldade</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                  difficulty === level
                    ? 'border-blue-500 bg-blue-50 text-slate-800 shadow-md shadow-blue-500/5'
                    : 'border-slate-200 bg-white hover:border-slate-350 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="text-xl font-bold mb-2">
                  {getDifficultyLabel(level)}
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  {level === 'easy' ? 'Seletores básicos' : 
                   level === 'medium' ? 'Seletores combinados' : 
                   'Seletores avançados'}
                </div>
              </button>
            ))}
          </div>
          <button 
            onClick={() => {
              setCurrentQuestion(0);
              setGameStarted(true);
            }} 
            className="btn-primary mt-6 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-400 hover:to-teal-400 text-white font-semibold py-4 px-10 rounded-2xl shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105 border-none"
          >
            Começar Jogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/30 p-6 text-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-650 bg-clip-text text-transparent mb-2">CSS Selector Master</h2>
          <p className="text-slate-500 font-medium">
            Escreva o seletor CSS correto para o elemento destacado
          </p>
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3 inline-block">
            <p className="text-sm text-blue-700 font-semibold">
              Questão {currentQuestion + 1} de {filteredChallenges.length} • 
              Dificuldade: {getDifficultyLabel(difficulty)}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Challenge */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-150 p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Eye className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-bold text-slate-850">Elemento HTML</h3>
            </div>
            
            <div className="bg-slate-900 rounded-xl p-4 mb-4 border border-slate-850 shadow-inner">
              <pre className="text-sm font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap">
                {currentChallenge.element}
              </pre>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 font-semibold leading-relaxed">
                {currentChallenge.description}
              </p>
            </div>
          </div>

          {/* Answer Input */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-150 p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Code className="h-5 w-5 text-teal-500 mr-2" />
              <h3 className="text-lg font-bold text-slate-850">Sua Resposta</h3>
            </div>
            
            <div className="mb-4">
              <label htmlFor="css-selector-input" className="block text-sm font-semibold text-slate-550 mb-2">
                Seletor CSS:
              </label>
              <input
                id="css-selector-input"
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Digite o seletor CSS..."
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 font-mono placeholder-slate-400 transition-all duration-300"
                disabled={showFeedback}
                aria-label="Digite o seletor CSS"
              />
            </div>

            {showFeedback && (
              <div className={`p-4 rounded-xl mb-4 ${
                isCorrect ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`} role="alert">
                <div className="flex items-center">
                  {isCorrect ? (
                    <Check className="h-5 w-5 text-emerald-500 mr-2" />
                  ) : (
                    <X className="h-5 w-5 text-rose-500 mr-2" />
                  )}
                  <span className={`font-medium ${
                    isCorrect ? 'text-emerald-700' : 'text-rose-700'
                  }`}>
                    {isCorrect ? 'Correto!' : 'Incorreto!'}
                  </span>
                </div>
                {!isCorrect && (
                  <p className="text-rose-800 mt-2 text-sm">
                    Resposta correta: <code className="font-mono bg-rose-200/50 px-2 py-0.5 rounded text-rose-700 font-bold">
                      {currentChallenge.selector}
                    </code>
                  </p>
                )}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!userAnswer.trim() || showFeedback}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border-none"
            >
              {showFeedback ? 'Processando...' : 'Verificar Resposta'}
            </button>

            {/* Progress */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-slate-500 mb-2">
                <span>Progresso</span>
                <span>{currentQuestion + 1} / {filteredChallenges.length}</span>
              </div>
              <div className="bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSSelector;