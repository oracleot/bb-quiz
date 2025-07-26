'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Question } from '@/types/quiz';
import { useQuizStore } from '@/lib/store';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
}

export function QuestionCard({ question, questionNumber }: QuestionCardProps) {
  const { answers, answerQuestion, isTimerStarted } = useQuizStore();
  
  const currentAnswer = answers.find(a => a.questionId === question.id)?.selectedAnswer;

  const handleAnswerSelect = (option: 'a' | 'b' | 'c' | 'd') => {
    if (!isTimerStarted) return; // Prevent answering if timer not started
    answerQuestion(question.id, option);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'reading': return '📖';
      case 'computing': return '💻';
      case 'curiosity': return '🤔';
      default: return '❓';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'reading': return 'Reading & Writing';
      case 'computing': return 'Computing Basics';
      case 'curiosity': return 'Interest & Curiosity';
      default: return 'General';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-2 border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getCategoryIcon(question.category)}</span>
            <div>
              <CardTitle className="text-lg text-blue-700">
                Question {questionNumber} of 10
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {getCategoryName(question.category)}
              </p>
            </div>
          </div>
          {currentAnswer && (
            <div className="text-green-600 font-medium">
              ✓ Answered
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Question Text */}
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <p className="text-lg leading-relaxed text-gray-800 font-medium">
              {question.text}
            </p>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {Object.entries(question.options).map(([key, value]) => (
              <Button
                key={key}
                variant={currentAnswer === key ? 'default' : 'outline'}
                className={`
                  w-full text-left justify-start p-4 h-auto min-h-[60px] whitespace-normal
                  ${currentAnswer === key 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500' 
                    : 'hover:bg-blue-50 border-gray-300'
                  }
                  ${!isTimerStarted ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                onClick={() => handleAnswerSelect(key as 'a' | 'b' | 'c' | 'd')}
                disabled={!isTimerStarted}
              >
                <div className="flex items-start space-x-3 w-full">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5
                    ${currentAnswer === key 
                      ? 'bg-white text-blue-500' 
                      : 'bg-blue-100 text-blue-700'
                    }
                  `}>
                    {key.toUpperCase()}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-base leading-relaxed break-words hyphens-auto">
                      {value}
                    </p>
                  </div>
                </div>
              </Button>
            ))}
          </div>

          {/* Encouragement */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Take your time and choose the answer that feels right to you! 🌟
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
