import React, { useState } from 'react';
import { Check, X, RotateCcw, Trophy, Code, Lightbulb } from 'lucide-react';
import { jsChallenges } from '../../data/gameData';
import type { GameScore } from '../../types';
import ScoreDisplay from '../ScoreDisplay';

interface JavaScriptQuizProps {
  onGameComplete: (score: GameScore) => void;
}

const JavaScriptQuiz: React.FC<JavaScriptQuizProps> = ({ onGameComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState<GameScore>({ correct: 0, total: 0, percentage: 0 });
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [gameStarted, setGameStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  
  // Filtra desafios pela dificuldade selecionada
  const filteredChallenges = jsChallenges.filter(c => c.difficulty === difficulty);
  const currentChallenge = filteredChallenges[currentQuestion];

  const getDifficultyLabel = (diff: string) => {
    switch (diff) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return diff;
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setShowFeedback(true);
    setShowExplanation(true);

    setTimeout(() => {
      if (currentQuestion < filteredChallenges.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setShowExplanation(false);
      } else {
        calculateScore(newAnswers);
      }
    }, 4000);
  };

  const calculateScore = (userAnswers: number[]) => {
    const correct = userAnswers.filter((answer, index) => {
      const challenge = filteredChallenges[index];
      return answer === challenge.correctAnswer;
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
    setSelectedAnswer(null);
    setAnswers([]);
    setShowFeedback(false);
    setGameCompleted(false);
    setScore({ correct: 0, total: 0, percentage: 0 });
    setShowExplanation(false);
    setGameStarted(false);
  };

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50/20 via-white to-amber-50/30 p-6 text-slate-800 flex flex-col justify-center items-center">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <div className="animate-bounce-in">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-yellow-550 to-orange-500 bg-clip-text text-transparent">
                JavaScript Logic Puzzle Concluído!
              </h2>
              <p className="text-slate-500 font-medium">
                Você testou seus conhecimentos em JavaScript
              </p>
            </div>
          </div>

          <div className="max-w-md mx-auto mb-8">
            <ScoreDisplay score={score} />
          </div>

          <div className="bg-white/85 backdrop-blur-sm rounded-2xl shadow-sm border border-yellow-200/60 p-6 mb-8">
            <h3 className="text-lg font-bold text-slate-850 mb-4">Revisão das Respostas</h3>
            <div className="space-y-4">
              {filteredChallenges.map((challenge, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === challenge.correctAnswer;
                
                return (
                  <div key={challenge.id} className={`p-4 rounded-lg border ${
                    isCorrect ? 'bg-emerald-50 border-emerald-250 text-emerald-805' : 'bg-rose-50 border-rose-250 text-rose-805'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-slate-800">{challenge.question}</h4>
                      {isCorrect ? (
                        <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-rose-505 flex-shrink-0" />
                      )}
                    </div>
                    
                    {challenge.code && (
                      <pre className="bg-slate-900 p-2 rounded-xl text-sm font-mono mb-2 overflow-x-auto text-amber-300">
                        {challenge.code}
                      </pre>
                    )}
                    
                    <div className="text-sm">
                      <p className="text-slate-600">
                        <span className="font-medium">Sua resposta: </span>
                        <span className={isCorrect ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>
                          {challenge.options[userAnswer]}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-slate-600 mt-1">
                          <span className="font-medium">Resposta correta: </span>
                          <span className="text-emerald-600 font-semibold">
                            {challenge.options[challenge.correctAnswer]}
                          </span>
                        </p>
                      )}
                      <p className="text-slate-500 mt-2 text-xs flex items-center gap-1.5 font-medium">
                        <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                        {challenge.explanation}
                      </p>
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-50/20 via-white to-amber-50/30 p-6 text-slate-800 flex flex-col justify-center items-center">
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">Selecione a Dificuldade</h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                  difficulty === level
                    ? 'border-yellow-450 bg-yellow-50 text-slate-800 shadow-md shadow-yellow-500/5 font-semibold'
                    : 'border-slate-200 bg-white hover:border-slate-350 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="text-xl font-bold mb-2">
                  {getDifficultyLabel(level)}
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  {level === 'easy' ? 'Conceitos básicos' : 
                   level === 'medium' ? 'Lógica intermediária' : 
                   'Conceitos avançados'}
                </div>
              </button>
            ))}
          </div>
          <button 
            onClick={() => {
              setCurrentQuestion(0);
              setGameStarted(true);
            }} 
            className="btn-primary mt-6 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 hover:from-yellow-450 hover:to-orange-450 text-white font-semibold py-4 px-10 rounded-2xl shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:scale-105 border-none"
          >
            Começar Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50/20 via-white to-amber-50/30 p-6 text-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-505 bg-clip-text text-transparent mb-2">JavaScript Logic Puzzle</h2>
          <p className="text-slate-550 font-medium">
            Teste seus conhecimentos em JavaScript
          </p>
          <div className="mt-4 bg-amber-50 border border-yellow-250/70 rounded-xl p-3 inline-block">
            <p className="text-sm text-amber-700 font-semibold">
              Questão {currentQuestion + 1} de {filteredChallenges.length} • 
              Dificuldade: {getDifficultyLabel(difficulty)}
            </p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-yellow-200/60 p-6 shadow-sm mb-6">
          <div className="flex items-center mb-4">
            <Code className="h-5 w-5 text-amber-500 mr-2" />
            <h3 className="text-lg font-bold text-slate-850">Questão</h3>
          </div>
          
          <h4 className="text-xl font-bold text-slate-800 mb-4">
            {currentChallenge.question}
          </h4>
          
          {currentChallenge.code && (
            <div className="bg-slate-900 rounded-xl p-4 mb-6 border border-slate-800 shadow-inner">
              <pre className="text-sm font-mono text-amber-300 overflow-x-auto whitespace-pre-wrap">
                {currentChallenge.code}
              </pre>
            </div>
          )}

          <div className="space-y-3 mb-6" role="radiogroup" aria-label="Opções de resposta">
            {currentChallenge.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                aria-pressed={selectedAnswer === index}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedAnswer === index
                    ? showFeedback
                      ? index === currentChallenge.correctAnswer
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-rose-500 bg-rose-50 text-rose-800'
                      : 'border-yellow-450 bg-yellow-50 text-yellow-800 font-semibold'
                    : showFeedback && index === currentChallenge.correctAnswer
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 bg-white hover:border-slate-350 hover:bg-slate-50 text-slate-700'
                } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">{option}</span>
                  {showFeedback && selectedAnswer === index && (
                    index === currentChallenge.correctAnswer ? (
                      <Check className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <X className="h-5 w-5 text-rose-505" />
                    )
                  )}
                  {showFeedback && selectedAnswer !== index && index === currentChallenge.correctAnswer && (
                    <Check className="h-5 w-5 text-emerald-500" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="bg-amber-50 border border-yellow-200/80 rounded-xl p-4 mb-4" role="alert">
              <div className="flex items-start">
                <Lightbulb className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-amber-700 mb-1">Explicação:</h5>
                  <p className="text-amber-850 text-sm leading-relaxed">{currentChallenge.explanation}</p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null || showFeedback}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-450 hover:to-orange-450 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-yellow-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border-none"
          >
            {showFeedback ? 'Processando...' : 'Confirmar Resposta'}
          </button>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-slate-500 mb-2">
              <span>Progresso</span>
              <span>{currentQuestion + 1} / {filteredChallenges.length}</span>
            </div>
            <div className="bg-slate-100 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaScriptQuiz;