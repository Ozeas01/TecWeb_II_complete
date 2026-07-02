import React, { useState, useEffect } from 'react';
import { Check, X, RotateCcw, Trophy, Code2, Target } from 'lucide-react';
import { htmlChallenges, htmlCategories } from '../../data/gameData';
import type { GameScore } from '../../types';
import ScoreDisplay from '../ScoreDisplay';

interface HTMLDragDropProps {
  onGameComplete: (score: GameScore) => void;
}

const HTMLDragDrop: React.FC<HTMLDragDropProps> = ({ onGameComplete }) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedItems, setDroppedItems] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, 'correct' | 'incorrect' | null>>({});
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showLevelTransition, setShowLevelTransition] = useState(false);
  const [score, setScore] = useState<GameScore>({ correct: 0, total: 0, percentage: 0 });
  const [currentLevel, setCurrentLevel] = useState(1);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [shuffledChallenges, setShuffledChallenges] = useState<typeof htmlChallenges>([]);

  // Embaralhar as tags quando o nível ou shuffleSeed mudar
  useEffect(() => {
    const challenges = getLevelChallenges(currentLevel);
    setShuffledChallenges([...challenges]);
  }, [currentLevel, shuffleSeed]);
  
  // Definir os desafios por nível de forma mais balanceada
  const getLevelChallenges = (level: number) => {
    const challenges = [];
    switch (level) {
      case 1:
        challenges.push(...htmlChallenges.slice(0, 4)); // h1, p, img, a
        break;
      case 2:
        challenges.push(...htmlChallenges.slice(0, 7)); // adiciona div, span, ul
        break;
      case 3:
        challenges.push(...htmlChallenges.slice(0, 10)); // adiciona button, input, nav
        break;
      default:
        challenges.push(...htmlChallenges.slice(0, 4));
    }
    
    // Embaralhar as tags com Fisher-Yates para distribuição uniforme
    const shuffled = [...challenges];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  };

  const getLevelCategories = (level: number) => {
    switch (level) {
      case 1:
        return htmlCategories.slice(0, 4); // heading, text, media, link
      case 2:
        return htmlCategories.slice(0, 7); // adiciona container, list, form
      case 3:
        return htmlCategories; // todas as categorias (10)
      default:
        return htmlCategories.slice(0, 4);
    }
  };

  const currentCategories = getLevelCategories(currentLevel);

  const handleDragStart = (e: React.DragEvent, tagId: string) => {
    e.stopPropagation();
    setDraggedItem(tagId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', tagId);
    
    // Adicionar classe para feedback visual
    const target = e.currentTarget as HTMLElement;
    target.classList.add('dragging');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.classList.remove('dragging');
    
    // Limpar o draggedItem após um pequeno delay se não foi dropado
    setTimeout(() => {
      setDraggedItem(null);
    }, 100);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedItem) return;

    const challenge = htmlChallenges.find(c => c.id === draggedItem);
    if (!challenge) return;

    const isCorrect = challenge.category === categoryId;
    
    setDroppedItems(prev => ({ ...prev, [draggedItem]: categoryId }));
    setFeedback(prev => ({ ...prev, [draggedItem]: isCorrect ? 'correct' : 'incorrect' }));
    
    // Limpar o estado imediatamente
    setDraggedItem(null);

    // Check if all items are placed
    const newDroppedItems = { ...droppedItems, [draggedItem]: categoryId };
    if (Object.keys(newDroppedItems).length === shuffledChallenges.length) {
      calculateScore(newDroppedItems);
    }
  };

  const calculateScore = (droppedItems: Record<string, string>) => {
    const correct = Object.entries(droppedItems).filter(([tagId, categoryId]) => {
      const challenge = htmlChallenges.find(c => c.id === tagId);
      return challenge?.category === categoryId;
    }).length;

    const total = shuffledChallenges.length;
    const percentage = Math.round((correct / total) * 100);
    
    const newScore = { correct, total, percentage };
    setScore(newScore);
    
    // Se completou com sucesso e não é o último nível
    if (percentage >= 70 && currentLevel < 3) {
      setShowLevelTransition(true);
      setTimeout(() => {
        setCurrentLevel(prev => prev + 1);
        resetGame();
        setShowLevelTransition(false);
      }, 2000);
    } else {
      setGameCompleted(true);
      setTimeout(() => {
        onGameComplete(newScore);
      }, 2000);
    }
  };

  const nextLevel = () => {
    if (currentLevel < 3) {
      setCurrentLevel(prev => prev + 1);
      resetGame();
    }
  };

  const resetGame = () => {
    setDroppedItems({});
    setFeedback({});
    setGameCompleted(false);
    setScore({ correct: 0, total: 0, percentage: 0 });
    setShuffleSeed(Math.random()); // Re-embaralhar as tags
  };

  const availableTags = shuffledChallenges.filter(challenge => !droppedItems[challenge.id]);

  // Tela de transição entre níveis
  if (showLevelTransition) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-red-50/30 flex items-center justify-center p-6 text-slate-800">
        <div className="text-center animate-bounce-in">
          <div className="bg-gradient-to-r from-orange-500 to-rose-600 p-6 rounded-full shadow-2xl mb-6 mx-auto w-24 h-24 flex items-center justify-center shadow-orange-500/20">
            <Trophy className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-slate-800">
            Nível {currentLevel - 1} Concluído!
          </h2>
          <p className="text-xl text-slate-500 mb-6">
            Preparando Nível {currentLevel}...
          </p>
          <div className="animate-pulse">
            <div className="w-16 h-2 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-red-50/30 flex items-center justify-center p-6 text-slate-800">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="animate-bounce-in">
              <div className="relative inline-block mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-rose-600 p-6 rounded-full shadow-2xl shadow-orange-500/25">
                  <Trophy className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-2 shadow-lg animate-pulse">
                  <Check className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 bg-clip-text text-transparent mb-4">
                Nível {currentLevel} Concluído!
              </h2>
              <p className="text-xl text-slate-500 mb-8 font-medium">
                Parabéns! Você dominou as tags HTML e suas categorias
              </p>
            </div>
          </div>

          <div className="mb-8">
            <ScoreDisplay score={score} />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={resetGame} className="btn-secondary flex items-center justify-center space-x-2 text-lg px-6 py-3 bg-white text-slate-700 border-slate-200 hover:bg-slate-50">
              <RotateCcw className="h-5 w-5" />
              <span>Jogar Novamente</span>
            </button>
            
            {currentLevel < 3 && score.percentage >= 70 && (
              <button onClick={nextLevel} className="btn-success flex items-center justify-center space-x-2 text-lg px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 text-white shadow-lg shadow-orange-500/20 border-none">
                <span>Próximo Nível</span>
                <Trophy className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-red-50/30 p-6 text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="animate-slide-down">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-rose-600 rounded-2xl shadow-lg mb-6 shadow-orange-500/10">
              <Code2 className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 bg-clip-text text-transparent mb-4">
              Desafio HTML - Nível {currentLevel}
            </h2>
            <p className="text-xl text-slate-500 mb-6 font-medium">
              Arraste as tags HTML para suas categorias corretas
            </p>
            
            {/* Progress Card */}
            <div className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm p-4 border border-orange-200">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-slate-700">
                    Progresso: {Object.keys(droppedItems).length} / {shuffledChallenges.length}
                  </span>
                </div>
                <div className="w-px h-6 bg-slate-200"></div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-rose-500" />
                  <span className="text-sm font-semibold text-slate-700">
                    Nível {currentLevel} de 3
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-2 gap-6">
          {/* Available Tags */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-orange-200">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-semibold mr-4">
                Tags
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                Tags HTML Disponíveis
              </h3>
            </div>
            
            <div className="space-y-2">
              {availableTags.map((challenge) => (
                <div
                  key={challenge.id}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, challenge.id)}
                  onDragEnd={handleDragEnd}
                  className="p-3 bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-orange-300 rounded-xl cursor-grab active:cursor-grabbing transition-all duration-200 select-none shadow-sm hover:shadow-orange-500/5 group relative"
                  style={{ 
                    touchAction: 'none',
                    WebkitTouchCallout: 'none'
                  } as React.CSSProperties}
                >
                  <div className="flex items-center justify-center">
                    <div className="bg-gradient-to-r from-orange-500 to-rose-600 text-white px-3 py-1.5 rounded-lg text-sm font-mono font-bold shadow-lg">
                      {challenge.tag}
                    </div>
                  </div>
                </div>
              ))}
              
              {availableTags.length === 0 && (
                <div className="text-center py-4">
                  <Check className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">
                    Todas as tags foram posicionadas!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Drop Zones */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-orange-200">
            <div className="flex items-center mb-3">
              <div className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">
                Categorias
              </div>
              <h3 className="text-lg font-bold text-slate-850">
                Categorias HTML
              </h3>
            </div>
            
            <div className="grid grid-cols-1 gap-2 max-h-[calc(100vh-300px)] overflow-y-auto">
              {currentCategories.map((category) => {
                const droppedInCategory = Object.entries(droppedItems)
                  .filter(([, catId]) => catId === category.id)
                  .map(([tagId]) => htmlChallenges.find(c => c.id === tagId))
                  .filter(Boolean);

                return (
                  <div key={category.id} className="border border-slate-100 rounded-xl p-3 bg-slate-50/50">
                    <div className="mb-2">
                      <h4 className="text-sm font-bold text-slate-800 mb-1">{category.name}</h4>
                      <p className="text-xs text-slate-500 leading-tight">{category.description}</p>
                    </div>
                    
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, category.id)}
                      className={`drop-zone border-2 border-dashed border-slate-200 bg-white rounded-xl p-3 min-h-[80px] flex flex-col gap-2 transition-all relative ${draggedItem ? 'border-orange-500/40 bg-orange-50/20' : ''}`}
                    >
                      {droppedInCategory.length === 0 ? (
                        <div className="text-center py-3">
                          <div className="bg-slate-100 rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-1">
                            <Code2 className="h-3 w-3 text-slate-400" />
                          </div>
                          <p className="text-slate-400 font-semibold text-xs">
                            Arraste as tags aqui
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {droppedInCategory.map((challenge) => {
                            if (!challenge) return null;
                            const isCorrect = feedback[challenge.id] === 'correct';
                            
                            return (
                              <div
                                key={challenge.id}
                                className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 ${
                                  isCorrect 
                                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-sm' 
                                    : 'bg-rose-50 border border-rose-200 text-rose-800 shadow-sm animate-shake'
                                }`}
                              >
                                <div className="flex items-center justify-center flex-1">
                                  <div className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                                    isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                  }`}>
                                    {challenge.tag}
                                  </div>
                                </div>
                                
                                <div className={`p-1 rounded-full ${
                                  isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                                }`}>
                                  {isCorrect ? (
                                    <Check className="h-3 w-3 text-white" />
                                  ) : (
                                    <X className="h-3 w-3 text-white" />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HTMLDragDrop;