import { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const useAutoRedirection = (initialSeconds = 10) => {
  const queryClient = useQueryClient();
  const [counter, setCounter] = useState(initialSeconds);

  const resetAndGoHome = useCallback(() => {
    queryClient.clear();
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
