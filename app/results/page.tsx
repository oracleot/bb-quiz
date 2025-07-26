'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuizStore } from '@/lib/store';
import { getFeedbackMessage, getCategoryBreakdown } from '@/lib/quiz-data';

export default function ResultsPage() {
  const router = useRouter();
  const { result, userInfo, resetQuiz } = useQuizStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const submitToGoogleSheets = useCallback(async () => {
    if (!result || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        // Clear localStorage after successful submission
        localStorage.removeItem('church-kids-quiz-storage');
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [result, isSubmitting]);

  useEffect(() => {
    // Redirect if no result
    if (mounted && (!result || !userInfo)) {
      router.push('/');
      return;
    }

    // Auto-submit results to Google Sheets
    if (mounted && result && submissionStatus === 'idle') {
      submitToGoogleSheets();
    }
  }, [mounted, result, userInfo, submissionStatus, router, submitToGoogleSheets]);

  // Don't render until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  // Redirect if no result
  if (!result || !userInfo) {
    return null;
  }

  const percentageScore = Math.round((result.score / result.totalQuestions) * 100);
  const feedbackMessage = getFeedbackMessage(result.score, result.totalQuestions);
  const categoryBreakdown = getCategoryBreakdown(result.answers);
  const completionMinutes = Math.floor(result.completionTime / 60);
  const completionSeconds = result.completionTime % 60;

  const handleTakeAgain = () => {
    // Clear localStorage and reset quiz state
    localStorage.removeItem('church-kids-quiz-storage');
    resetQuiz();
    router.push('/');
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreEmoji = (percentage: number) => {
    if (percentage >= 80) return '🏆';
    if (percentage >= 60) return '⭐';
    if (percentage >= 40) return '👍';
    return '💪';
  };

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'reading':
        return { name: 'Reading & Writing', icon: '📚' };
      case 'computing':
        return { name: 'Computing Basics', icon: '💻' };
      case 'curiosity':
        return { name: 'Interest & Curiosity', icon: '🤔' };
      default:
        return { name: category, icon: '❓' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              🎉 Great Job, {userInfo.name}! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              You&apos;ve completed the Church Kids Coding Aptitude Quiz!
            </p>
          </div>

          {/* Submission Status */}
          {isSubmitting && (
            <Card className="border-2 border-blue-200 bg-blue-50 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                  <p className="text-blue-800">Saving your results...</p>
                </div>
              </CardContent>
            </Card>
          )}

          {submissionStatus === 'success' && (
            <Card className="border-2 border-green-200 bg-green-50 mb-6">
              <CardContent className="p-4">
                <p className="text-green-800 text-center">
                  ✅ Your results have been saved successfully! Your progress has been cleared and you can take the quiz again anytime.
                </p>
              </CardContent>
            </Card>
          )}

          {submissionStatus === 'error' && (
            <Card className="border-2 border-red-200 bg-red-50 mb-6">
              <CardContent className="p-4">
                <p className="text-red-800 text-center">
                  ⚠️ There was an issue saving your results, but don&apos;t worry - your quiz is complete!
                </p>
              </CardContent>
            </Card>
          )}

          {/* Score Card */}
          <Card className="border-2 border-yellow-200 shadow-xl mb-6">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardTitle className="text-2xl text-center text-yellow-800">
                {getScoreEmoji(percentageScore)} Your Score
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className={`text-6xl md:text-8xl font-bold mb-2 ${getScoreColor(percentageScore)}`}>
                  {result.score}/{result.totalQuestions}
                </div>
                <div className={`text-3xl md:text-4xl font-semibold ${getScoreColor(percentageScore)}`}>
                  {percentageScore}%
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <p className="text-lg text-gray-700">
                  <strong>Time taken:</strong> {completionMinutes}m {completionSeconds}s
                </p>
              </div>

              <div className="text-lg text-gray-700 leading-relaxed">
                {feedbackMessage}
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card className="border-2 border-purple-200 shadow-lg mb-6">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="text-xl text-center text-purple-800">
                📊 Your Performance by Category
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(categoryBreakdown).map(([category, data]) => {
                  const categoryInfo = getCategoryInfo(category);
                  return (
                    <div key={category} className="text-center p-4 bg-white rounded-lg border-2 border-gray-200">
                      <div className="text-2xl mb-2">{categoryInfo.icon}</div>
                      <h3 className="font-semibold text-gray-800 mb-2">{categoryInfo.name}</h3>
                      <div className="text-lg font-bold text-blue-600">
                        {data.correct}/{data.total}
                      </div>
                      <div className="text-sm text-gray-600">
                        {Math.round((data.correct / data.total) * 100)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* What&apos;s Next */}
          <Card className="border-2 border-blue-200 shadow-lg mb-6">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle className="text-xl text-center text-blue-800">
                🚀 What&apos;s Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white rounded-lg border-2 border-gray-200">
                  <div className="text-3xl mb-2">📚</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Keep Learning</h3>
                  <p className="text-sm text-gray-600">
                    Ask your parents about coding classes and online resources to continue your coding journey!
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border-2 border-gray-200">
                  <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Join Our Program</h3>
                  <p className="text-sm text-gray-600">
                    Talk to your church leaders about joining our kids coding program to learn with friends!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleTakeAgain}
              size="lg"
              className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🔄 Take Quiz Again
            </Button>
            <Button
              variant="outline"
              onClick={() => window.print()}
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-2 border-gray-300 hover:border-gray-400"
            >
              🖨️ Print Results
            </Button>
          </div>

          {/* Footer Message */}
          <div className="mt-8 text-center">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <p className="text-lg text-green-800 font-medium">
                🌟 Remember, every coder started as a beginner. 
                Keep practicing, stay curious, and never stop learning! 🌟
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
