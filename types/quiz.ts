// Type definitions for the Church Kids Coding Aptitude Quiz

export interface Question {
  id: number;
  category: 'reading' | 'computing' | 'curiosity';
  text: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correctAnswer: 'a' | 'b' | 'c' | 'd';
}

export interface UserInfo {
  name: string;
  age: number;
}

export interface QuizAnswer {
  questionId: number;
  selectedAnswer: 'a' | 'b' | 'c' | 'd' | null;
}

export interface QuizResult {
  userInfo: UserInfo;
  answers: QuizAnswer[];
  score: number;
  totalQuestions: number;
  completionTime: number; // in seconds
  timestamp: Date;
}

export interface QuizState {
  userInfo: UserInfo | null;
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  startTime: Date | null;
  timeRemaining: number; // in seconds (10 minutes = 600 seconds)
  isTimerStarted: boolean; // whether the timer has been manually started
  isCompleted: boolean;
  result: QuizResult | null;
}

export interface QuizStore extends QuizState {
  // Actions
  setUserInfo: (userInfo: UserInfo) => void;
  startQuiz: () => void;
  startTimer: () => void; // new action to start the timer manually
  answerQuestion: (questionId: number, answer: 'a' | 'b' | 'c' | 'd') => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
  updateTimeRemaining: (time: number) => void;
}

export interface GoogleSheetsData {
  timestamp: string;
  name: string;
  age: number;
  q1Answer: string;
  q2Answer: string;
  q3Answer: string;
  q4Answer: string;
  q5Answer: string;
  q6Answer: string;
  q7Answer: string;
  q8Answer: string;
  q9Answer: string;
  q10Answer: string;
  score: number;
  duration: number; // in minutes
}
