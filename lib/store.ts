import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuizStore, UserInfo, QuizResult } from '@/types/quiz';
import { quizQuestions } from '@/lib/quiz-data';

const DEFAULT_QUIZ_TIME_LIMIT = 10 * 60; // 10 minutes in seconds (fallback)

// Function to fetch timer configuration from API
async function getTimerConfig(): Promise<number> {
  try {
    const response = await fetch('/api/timer-config');
    if (response.ok) {
      const config = await response.json();
      return config.timerDurationMinutes * 60; // Convert minutes to seconds
    }
  } catch (error) {
    console.error('Failed to fetch timer config:', error);
  }
  return DEFAULT_QUIZ_TIME_LIMIT; // Fallback to default
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      // Initial state
      userInfo: null,
      currentQuestionIndex: 0,
      answers: Array.from({ length: quizQuestions.length }, (_, i) => ({
        questionId: i + 1,
        selectedAnswer: null,
      })),
      startTime: null,
      timeRemaining: DEFAULT_QUIZ_TIME_LIMIT,
      isTimerStarted: false,
      isCompleted: false,
      result: null,

      // Actions
      setUserInfo: (userInfo: UserInfo) => {
        set({ userInfo });
      },

      startQuiz: () => {
        set({
          currentQuestionIndex: 0,
          isCompleted: false,
          result: null,
        });
      },

      startTimer: async () => {
        const timerDuration = await getTimerConfig();
        const now = new Date();
        set({
          startTime: now,
          timeRemaining: timerDuration,
          isTimerStarted: true,
        });
      },

      answerQuestion: (questionId: number, answer: 'a' | 'b' | 'c' | 'd') => {
        set((state) => {
          const newAnswers = state.answers.map((ans) =>
            ans.questionId === questionId
              ? { ...ans, selectedAnswer: answer }
              : ans
          );
          return { answers: newAnswers };
        });
      },

      nextQuestion: () => {
        set((state) => {
          const nextIndex = Math.min(
            state.currentQuestionIndex + 1,
            quizQuestions.length - 1
          );
          return { currentQuestionIndex: nextIndex };
        });
      },

      previousQuestion: () => {
        set((state) => {
          const prevIndex = Math.max(state.currentQuestionIndex - 1, 0);
          return { currentQuestionIndex: prevIndex };
        });
      },

      submitQuiz: () => {
        const state = get();
        if (!state.userInfo || !state.startTime) {
          return;
        }

        // Calculate score
        let score = 0;
        state.answers.forEach((answer) => {
          const question = quizQuestions.find((q) => q.id === answer.questionId);
          if (question && answer.selectedAnswer === question.correctAnswer) {
            score++;
          }
        });

        // Calculate completion time
        const completionTime = Math.floor(
          (Date.now() - state.startTime.getTime()) / 1000
        );

        const result: QuizResult = {
          userInfo: state.userInfo,
          answers: state.answers,
          score,
          totalQuestions: quizQuestions.length,
          completionTime,
          timestamp: new Date(),
        };

        set({
          result,
          isCompleted: true,
        });
      },

      resetQuiz: () => {
        set({
          userInfo: null,
          currentQuestionIndex: 0,
          answers: Array.from({ length: quizQuestions.length }, (_, i) => ({
            questionId: i + 1,
            selectedAnswer: null,
          })),
          startTime: null,
          timeRemaining: DEFAULT_QUIZ_TIME_LIMIT,
          isTimerStarted: false,
          isCompleted: false,
          result: null,
        });
      },

      updateTimeRemaining: (time: number) => {
        set({ timeRemaining: time });
        
        // Auto-submit when time runs out
        if (time <= 0) {
          get().submitQuiz();
        }
      },
    }),
    {
      name: 'church-kids-quiz-storage',
      // Only persist user progress, not sensitive data
      partialize: (state) => ({
        userInfo: state.userInfo,
        answers: state.answers,
        currentQuestionIndex: state.currentQuestionIndex,
      }),
    }
  )
);
