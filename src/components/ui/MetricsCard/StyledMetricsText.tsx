import { StyledMetricsTextProps } from '@/types';
import React from 'react';

const StyledMetricsText = ({ metricContents }: StyledMetricsTextProps) => {
  return (
    <div className="font-poppins inline-flex items-center gap-2 text-[54px]/19">
      {metricContents.map((item, index) => (
        <span
          key={index}
          className={`${item.highlighted ? 'text-neutral-dark-500 font-medium' : 'font-semibold text-white'}`}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
};

export default StyledMetricsText;
