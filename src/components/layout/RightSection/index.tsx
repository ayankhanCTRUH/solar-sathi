import LeaderBoard from '@/components/ui/LeaderBoard';
import Testimonial from '@/components/ui/Testimonial';

const RightSection = () => {
  return (
    <div className="pointer-events-auto z-[1] flex max-w-[360px] flex-col gap-6">
      <LeaderBoard />
      <Testimonial />
    </div>
  );
};

export default RightSection;
