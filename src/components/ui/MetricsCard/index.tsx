import { StyledMetricsTextProps, MetricsCardProps } from '@/types';
import React from 'react';

const StyledMetricsText = ({ metricContents }: StyledMetricsTextProps) => {
  return (
    <div className="font-poppins inline-flex items-center gap-2 text-[54px]/19">
      {metricContents.map((item, index) => (
        <span
          key={index}
          className={`font-${item.highlighted ? 'medium text-neutral-dark-500' : 'semibold text-white'}`}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
};

const MetricsCard = ({ title, icon, metricContents }: MetricsCardProps) => {
  return (
    <div className="bg-background-dark-200 w-full rounded-xl border border-neutral-400 px-5 py-4 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.20)] backdrop:blur-sm">
      <div className="flex items-start justify-between">
        <h3 className="font-dm-sans text-[24px] font-medium">{title}</h3>
        <div className="bg-background-dark-300 w-fit rounded-xl p-[14px]">
          {React.cloneElement(icon, {
            className: 'h-9 w-9',
          })}
        </div>
      </div>
      <StyledMetricsText metricContents={metricContents} />
    </div>
  );
};

export default MetricsCard;
