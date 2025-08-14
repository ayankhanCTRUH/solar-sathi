import { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMapStateAndCityState, useSolarState } from '@/lib/store';

const useAutoRedirection = (initialSeconds = 10) => {
  const queryClient = useQueryClient();
  const solarState = useSolarState();
  const mapStateAndCityState = useMapStateAndCityState();
  const [counter, setCounter] = useState(initialSeconds);

  const resetAndGoHome = useCallback(() => {
    localStorage.clear();
    queryClient.clear();
    solarState.reset();
    mapStateAndCityState.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryClient]);

  useEffect(() => {
    if (counter <= 0) {
      resetAndGoHome();
      return;
    }

    const timer = setTimeout(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter, resetAndGoHome]);

  return { counter, resetAndGoHome, setCounter };
};

export default useAutoRedirection;
