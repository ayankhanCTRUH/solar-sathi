import BreadCrumbs from '@/components/ui/BreadCrumbs';
import MetricsCard from '@/components/ui/MetricsCard';
import { BREADCRUMBS_DATA, METRICS_DATA } from '@/data/constants';

const LeftSection = () => {
  return (
    <div className="flex h-full w-[368px] flex-col gap-5">
      <BreadCrumbs items={BREADCRUMBS_DATA} />

      <hr className="border-background-dark-100" />
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
