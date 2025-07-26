'use client';

import { useEffect } from 'react';
import { useQuizStore } from '@/lib/store';

interface TimerProps {
  onTimeUp?: () => void;
}

export function Timer({ onTimeUp }: TimerProps) {
  const { timeRemaining, updateTimeRemaining } = useQuizStore();

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp?.();
      return;
    }

    const timer = setInterval(() => {
      updateTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, updateTimeRemaining, onTimeUp]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const getTimerColor = (): string => {
    if (timeRemaining <= 120) return 'text-red-600'; // Last 2 minutes
    if (timeRemaining <= 300) return 'text-yellow-600'; // Last 5 minutes
    return 'text-green-600';
  };

  const getProgressPercentage = (): number => {
    const totalTime = 10 * 60; // 10 minutes
    return ((totalTime - timeRemaining) / totalTime) * 100;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-2 border-blue-200">
      <div className="text-center">
        <div className="text-sm font-medium text-gray-600 mb-2">Time Remaining</div>
        <div className={`text-2xl font-bold ${getTimerColor()}`}>
          {formatTime(timeRemaining)}
        </div>
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                timeRemaining <= 120
                  ? 'bg-red-500'
                  : timeRemaining <= 300
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
        {timeRemaining <= 120 && (
          <div className="text-xs text-red-600 mt-1 animate-pulse">
            ⚠️ Less than 2 minutes left!
          </div>
        )}
      </div>
    </div>
  );
}
