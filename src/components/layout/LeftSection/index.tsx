import BreadCrumbs from '@/components/ui/BreadCrumbs';
import MetricsCard from '@/components/ui/MetricsCard';
import { BREADCRUMBS_DATA, METRICS_DATA } from '@/data/constants';
import Image from 'next/image';

const LeftSection = () => {
  return (
    <div className="pointer-events-auto flex h-full max-w-[320px] min-w-[320px] flex-col gap-5">
      <Image
        width={0}
        height={0}
        src="/icons/logo.svg"
        alt="logo"
        className="mb-3 h-full max-h-37 w-full max-w-52"
      />
      <BreadCrumbs items={BREADCRUMBS_DATA} />

      <hr className="border-background-dark-100" />
      <div className="flex flex-col gap-5">
        {METRICS_DATA?.map((metric, index) => (
          <MetricsCard key={index} data={metric} />
        ))}
      </div>
    </div>
  );
};

export default LeftSection;
