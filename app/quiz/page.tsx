'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer } from '@/components/Timer';
import { ProgressBar } from '@/components/ProgressBar';
import { QuestionCard } from '@/components/QuestionCard';
import { useQuizStore } from '@/lib/store';
import { quizQuestions } from '@/lib/quiz-data';

export default function QuizPage() {
  const router = useRouter();
  const {
    userInfo,
    currentQuestionIndex,
    answers,
    timeRemaining, // eslint-disable-line @typescript-eslint/no-unused-vars
    isTimerStarted,
    isCompleted,
    startQuiz,
    startTimer,
    nextQuestion,
    previousQuestion,
    submitQuiz,
    resetQuiz,
  } = useQuizStore();

  const startTime = useQuizStore((state) => state.startTime);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Redirect if no user info
    if (mounted && !userInfo) {
      router.push('/info');
      return;
    }

    // Initialize quiz if not already started (but don't start timer)
    if (mounted && userInfo && !startTime && !isCompleted) {
      startQuiz();
    }
  }, [mounted, userInfo, startTime, isCompleted, startQuiz, router]);

  useEffect(() => {
    // Auto-redirect when quiz is completed
    if (isCompleted) {
      router.push('/results');
    }
  }, [isCompleted, router]);

  // Don't render until mounted (prevents hydration issues)
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  // Redirect if no user info
  if (!userInfo) {
    return null;
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id)?.selectedAnswer;
  const canGoBack = currentQuestionIndex > 0;
  const canGoNext = currentAnswer !== null && currentAnswer !== undefined && currentQuestionIndex < quizQuestions.length - 1;
  const canSubmit = currentAnswer !== null && currentAnswer !== undefined && currentQuestionIndex === quizQuestions.length - 1;

  const handleNext = () => {
    if (canGoNext) {
      nextQuestion();
    } else if (canSubmit) {
      submitQuiz();
    }
  };

  const handlePrevious = () => {
    if (canGoBack) {
      previousQuestion();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {!isTimerStarted ? (
                <span>👋 Hi {userInfo.name}!</span>
              ) : (
                <span className='text-xl'>{userInfo.name}, remember to read each question carefully before answering!</span>
              )}
            </h1>
          </div>

          {/* Start Timer Section */}
          {!isTimerStarted && (
            <div className="mb-6">
              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="p-6 text-center">
                  <h2 className="text-lg font-semibold text-green-800 mb-3">
                    🚀 Ready to Begin?
                  </h2>
                  <p className="text-green-700 mb-4">
                    Answer each question to the best of your ability. When you&apos;re ready, click the button below to start your 10-minute timer!
                  </p>
                  <Button
                    onClick={startTimer}
                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 px-6 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    ⏰ Start Timer & Begin Quiz!
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Timer */}
          {isTimerStarted && (
            <div className="mb-6">
              <Timer />
            </div>
          )}

          {/* Question Card */}
          <div className="mb-6">
            <QuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
            />
          </div>

          {/* Navigation */}
          <Card className="border-2 border-blue-200 shadow-lg bg-blue-50">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                {/* Previous Button */}
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={!canGoBack}
                  className="w-full sm:w-auto px-6 py-3 text-lg border-2 border-blue-300 hover:border-blue-400 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous Question
                </Button>

                {/* Question Counter */}
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-700">
                    Question {currentQuestionIndex + 1} of {quizQuestions.length}
                  </p>
                  {(currentAnswer === null || currentAnswer === undefined) && (
                    <p className="text-sm text-orange-600 mt-1">
                      Please select an answer to continue
                    </p>
                  )}
                </div>

                {/* Next/Submit Button */}
                <Button
                  onClick={handleNext}
                  disabled={currentAnswer === null || currentAnswer === undefined}
                  className="w-full sm:w-auto px-6 py-3 text-lg font-semibold bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
                >
                  {canSubmit ? (
                    <>🎉 Finish Quiz!</>
                  ) : (
                    <>Next Question →</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Progress Bar - below question */}
          <div className="mb-6">
            <ProgressBar />
          </div>

          {/* Help Section */}
          <div className="mt-8">
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">
                  💡 Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                  <div>
                    <h4 className="font-semibold mb-2">Quiz Tips:</h4>
                    <ul className="space-y-1">
                      <li>• Read each question carefully</li>
                      <li>• Start the timer when you&apos;re ready</li>
                      <li>• Take your time to think</li>
                      <li>• Choose the best answer</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Remember:</h4>
                    <ul className="space-y-1">
                      <li>• This is just for fun and learning</li>
                      <li>• There&apos;s no penalty for wrong answers</li>
                      <li>• Do your best and enjoy!</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Exit */}
          <div className="text-center mt-6">
            <Button 
              variant="ghost" 
              onClick={() => {
                resetQuiz();
                router.push('/');
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              🏠 Exit Quiz (Go Home)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
