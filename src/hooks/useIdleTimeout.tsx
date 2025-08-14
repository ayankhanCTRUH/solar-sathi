'use client';
import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMapStateAndCityState, useSolarState } from '@/lib/store';

const useIdleTimeout = (timeout = 120000) => {
  const queryClient = useQueryClient();
  const solarState = useSolarState();
  const mapStateAndCityState = useMapStateAndCityState();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      localStorage.clear();
      queryClient.clear();
      solarState.reset();
      mapStateAndCityState.reset();
    }, timeout);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeout]);
};

export default useIdleTimeout;
