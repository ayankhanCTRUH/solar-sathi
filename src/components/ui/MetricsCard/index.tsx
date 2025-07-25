import { RupeeIcon } from '@/components/icons';
import React from 'react';

const MetricsCard = () => {
  return (
    <div className="bg-background-dark-200 w-full rounded-xl border border-neutral-400 px-5 py-4 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.20)] backdrop:blur-sm">
      <div className="flex items-start justify-between">
        <h3 className="font-dm-sans text-[24px] font-medium">
          Annual Savings Generated
        </h3>
        <div className="bg-background-dark-300 w-fit rounded-xl p-[14px]">
          <RupeeIcon className="h-9 w-9" />
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;
