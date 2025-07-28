'use client';
import useAutoRedirection from '@/hooks/useAutoRedirection';
import { useEffect } from 'react';

const AutoRedirectBody = ({
  handleRedirection,
  className = '',
}: {
  handleRedirection: () => void;
  className?: string;
}) => {
  const { counter, resetAndGoHome } = useAutoRedirection();

  // TODO: remove this function and useEffect after implementing the redirection
  const completeRedirection = () => {
    resetAndGoHome();
    handleRedirection();
  };

  useEffect(() => {
    if (counter === 0) {
      completeRedirection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  return (
    <div
      className={`font-poppins cursor-pointer text-2xl leading-6 whitespace-nowrap text-white underline ${className}`}
      onClick={completeRedirection}
    >
      Back To Home ({counter}s)
    </div>
  );
};

export default AutoRedirectBody;
