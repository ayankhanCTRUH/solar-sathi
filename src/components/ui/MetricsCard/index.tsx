import { RupeeIcon } from '@/components/icons';
import React from 'react';

const MetricsCard = () => {
  return (
    <div className="bg-background-dark-200 w-full border border-[red] text-white backdrop:blur-sm">
      <h3>Annual Savings Generated</h3>
      <div className="w-fit bg-[blue]">
        <RupeeIcon />
      </div>
    </div>
  );
};

export default MetricsCard;
