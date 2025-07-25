import LeaderBoard from '@/components/ui/LeaderBoard';
import Testimonial from '@/components/ui/Testimonial';

const RightSection = () => {
  return (
    <div className="flex flex-col gap-6">
      <LeaderBoard />
      <Testimonial />
    </div>
  );
};

export default RightSection;
