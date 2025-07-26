'use client';

import { useEffect, useState } from 'react';

export function TimerDisplay() {
  const [timerDuration, setTimerDuration] = useState<number | null>(null);

  useEffect(() => {
    async function fetchTimerConfig() {
      try {
        const response = await fetch('/api/timer-config');
        if (response.ok) {
          const config = await response.json();
          setTimerDuration(config.timerDurationMinutes);
        }
      } catch (error) {
        console.error('Failed to fetch timer config:', error);
        setTimerDuration(10); // Fallback to 10 minutes
      }
    }
    fetchTimerConfig();
  }, []);

  if (timerDuration === null) {
    return <span>Loading...</span>;
  }

  return <span>{timerDuration} Minutes</span>;
}
