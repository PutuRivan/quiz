import { useEffect, useRef } from 'react';

export function useTimer(isActive, timeRemaining, setTimeRemaining, onComplete) {
  const intervalRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  // Keep the onComplete callback up to date
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // timeRemaining and setTimeRemaining are intentionally excluded to prevent interval restart
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    console.log('🔄 Timer useEffect triggered:', { isActive, timeRemaining });

    // Clear any existing interval first
    if (intervalRef.current) {
      console.log('⏹️ Clearing existing interval');
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only start a new interval if quiz is active and time remaining
    if (isActive && timeRemaining > 0) {
      console.log('▶️ Starting new timer interval with', timeRemaining, 'seconds');
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          const newValue = prev <= 1 ? 0 : prev - 1;
          console.log('⏱️ Timer tick:', newValue, 'seconds remaining');

          if (prev <= 1) {
            console.log('⏰ Timer completed!');
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            onCompleteRef.current();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      console.log('✅ Interval created:', intervalRef.current);
    } else {
      console.log('⏸️ Timer not started:', { isActive, timeRemaining });
    }

    return () => {
      if (intervalRef.current) {
        console.log('🧹 Cleanup: clearing interval');
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive]); // Only depend on isActive

  return timeRemaining;
}
