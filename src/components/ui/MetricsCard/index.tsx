import React from 'react';
import { MetricsCardProps } from '@/types';

const MetricsCard = ({
  data: { title, metricContents, icon: Icon },
}: {
  data: MetricsCardProps;
}) => {
  return (
    <div className="bg-background-dark-200 shadow-smoke flex w-full flex-col gap-6.5 rounded-xl border border-neutral-400 px-5 py-4 text-white backdrop:blur-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-dm-sans leading-trim text-[24px] font-medium">
          {title}
        </h3>
        <div className="bg-background-dark-300 w-fit rounded-xl p-[14px]">
          <Icon className="h-9 w-9" />
        </div>
      </div>
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
    </div>
  );
};

export default MetricsCard;
