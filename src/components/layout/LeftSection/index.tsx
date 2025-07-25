import MetricsCard from '@/components/ui/MetricsCard';
import { METRICS_DATA } from '@/data/constants';

const LeftSection = () => {
  return (
    <div className="h-full w-[368px] pl-12">
      <div className="flex flex-col gap-5">
        {METRICS_DATA?.map((metric, index) => (
          <MetricsCard
            key={index}
            title={metric.title}
            icon={metric.icon}
            metricContents={metric.metricContents}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftSection;
