import React from 'react';
import { Home } from 'lucide-react';

interface HeaderProps {
  currentGame: string | null;
  onNavigateHome: () => void;
  totalScore: number;
}

const Header: React.FC<HeaderProps> = ({ currentGame, onNavigateHome }) => {
  const getGameDisplayName = (game: string | null) => {
    switch (game) {
      case 'html-drag-drop':
        return 'Desafio HTML';
      case 'css-selector':
        return 'CSS Selector';
      case 'javascript-quiz':
        return 'JavaScript Logic';
      default:
        return '';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Simple and Clean Back to Home Button */}
          <button
            onClick={onNavigateHome}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-semibold px-4.5 py-2 rounded-xl transition-all duration-300 hover:bg-slate-100"
          >
            <Home className="h-4 w-4" />
            <span>Início</span>
          </button>
          
          {currentGame && (
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full animate-pulse ${
                currentGame === 'html-drag-drop' 
                  ? 'bg-orange-500' 
                  : currentGame === 'css-selector' 
                    ? 'bg-blue-500' 
                    : 'bg-yellow-500'
              }`}></span>
              <span className="text-sm font-semibold text-slate-700">
                {getGameDisplayName(currentGame)}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;