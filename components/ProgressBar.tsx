'use client';

import { Progress } from '@/components/ui/progress';
import { useQuizStore } from '@/lib/store';
import { quizQuestions } from '@/lib/quiz-data';

export function ProgressBar() {
  const { answers } = useQuizStore();
  
  // Calculate answered questions
  const answeredCount = answers.filter(answer => answer.selectedAnswer !== null).length;
  const completionPercentage = (answeredCount / quizQuestions.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-2 border-blue-200">
      <div className="space-y-4">
        {/* Completion Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Questions Answered</span>
            <span className="text-sm font-bold text-green-600">
              {answeredCount} of {quizQuestions.length}
            </span>
          </div>
          <Progress value={completionPercentage} className="h-3" />
        </div>

        {/* Question indicators */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 mt-3">
          {quizQuestions.map((_, index) => {
            const isAnswered = answers[index]?.selectedAnswer !== null;
            
            return (
              <div
                key={index}
                className={`
                  w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center
                  ${isAnswered 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {index + 1}
              </div>
            );
          })}
        </div>

        {/* Encouragement */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            {answeredCount === quizQuestions.length 
              ? '🎉 All questions answered! Ready to finish?' 
              : `${quizQuestions.length - answeredCount} question${quizQuestions.length - answeredCount !== 1 ? 's' : ''} remaining`
            }
          </p>
        </div>
      </div>
    </div>
  );
}
