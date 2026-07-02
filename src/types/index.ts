export interface GameScore {
  correct: number;
  total: number;
  percentage: number;
}

export interface HTMLChallenge {
  id: string;
  tag: string;
  description: string;
  category: string;
}

export interface CSSChallenge {
  id: string;
  selector: string;
  description: string;
  element: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface JSChallenge {
  id: string;
  question: string;
  code: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}