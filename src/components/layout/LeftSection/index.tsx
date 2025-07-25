import { RupeeIcon, SolarHomeIcon } from '@/components/icons';
import MetricsCard from '@/components/ui/MetricsCard';

const LeftSection = () => {
  return (
    <div className="h-full w-[368px] pl-12">
      <MetricsCard
        title="Annual Savings Generated"
        icon={<RupeeIcon />}
        metricContents={[{ text: '₹53.9' }, { text: 'Cr', highlighted: true }]}
      />
      <MetricsCard
        title="Solarsquare Homes"
        icon={<SolarHomeIcon />}
        metricContents={[{ text: '29,983+' }]}
      />
    </div>
  );
};

export default LeftSection;
