import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HomePage from './components/HomePage';
import HTMLDragDrop from './components/games/HTMLDragDrop';
import CSSSelector from './components/games/CSSSelector';
import JavaScriptQuiz from './components/games/JavaScriptQuiz';
import type { GameScore } from './types';

function App() {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, GameScore>>({});
  const hasLoadedScores = useRef(false);

  // Load scores from localStorage on component mount
  useEffect(() => {
    const savedScores = localStorage.getItem('webLearningGamesScores');
    if (savedScores) {
      try {
        setScores(JSON.parse(savedScores));
      } catch (error) {
        console.error('Error loading scores:', error);
      }
    }
    hasLoadedScores.current = true;
  }, []);

  // Save scores to localStorage whenever scores change (skip initial mount)
  useEffect(() => {
    if (!hasLoadedScores.current) return;
    localStorage.setItem('webLearningGamesScores', JSON.stringify(scores));
  }, [scores]);

  const handleGameSelect = (gameId: string) => {
    setCurrentGame(gameId);
  };

  const handleGameComplete = (gameId: string, score: GameScore) => {
    setScores(prev => ({
      ...prev,
      [gameId]: score
    }));
    
    // Auto-navigate back to home after a delay
    setTimeout(() => {
      setCurrentGame(null);
    }, 3000);
  };

  const handleNavigateHome = () => {
    setCurrentGame(null);
  };

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score.percentage, 0);

  const renderGame = () => {
    switch (currentGame) {
      case 'html-drag-drop':
        return (
          <HTMLDragDrop 
            onGameComplete={(score) => handleGameComplete('html-drag-drop', score)} 
          />
        );
      case 'css-selector':
        return (
          <CSSSelector 
            onGameComplete={(score) => handleGameComplete('css-selector', score)} 
          />
        );
      case 'javascript-quiz':
        return (
          <JavaScriptQuiz 
            onGameComplete={(score) => handleGameComplete('javascript-quiz', score)} 
          />
        );
      default:
        return (
          <HomePage 
            onGameSelect={handleGameSelect} 
          />
        );
    }
  };

  const isHome = currentGame === null;

  return (
    <div className={`min-h-screen ${isHome ? 'bg-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      {!isHome && (
        <Header 
          currentGame={currentGame}
          onNavigateHome={handleNavigateHome}
          totalScore={Math.round(totalScore)}
        />
      )}
      
      <main className={isHome ? '' : 'pb-8'}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGame || 'home'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderGame()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Footer - only in game views */}
      {!isHome && (
        <footer className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                Web Learning Games - Plataforma Educativa de Desenvolvimento Web
              </p>
              <p className="text-sm text-gray-500">
                Desenvolvido com ❤️ para tornar o aprendizado de programação mais divertido
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;