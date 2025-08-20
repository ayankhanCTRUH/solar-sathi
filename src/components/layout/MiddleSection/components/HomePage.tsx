import Button from '@/components/ui/Button';
import MixColorsText from '@/components/ui/MixColorsText';
import useQueryParams from '@/hooks/useQueryParams';
import { useSolarState } from '@/lib/store';

const HomePage = () => {
  const { setIsHomePage } = useSolarState();
  const { setParams } = useQueryParams();

  const handleExploreClick = () => {
    setIsHomePage(false);
    setParams({ country: 'India' });
  };

  return (
    <div className="font-dm-sans relative flex h-full flex-col items-center justify-center gap-12 text-white before:absolute before:top-50 before:z-[-1] before:h-full before:w-full before:backdrop-blur-[2px]">
      <div className="flex flex-col items-center gap-4">
        <MixColorsText
          content={[
            { text: 'India is going solar,', break: true },
            { text: 'one rooftop at a time.' },
            { text: 'Join the Solar Revolution!', variant: 'blue' },
          ]}
          className="justify-center text-center"
          contentClassName="!text-7xl/[100px] !-tracking-[1.44px] [&:last-child]:!text-6xl/[84px] [&:last-child]:!-tracking-[1.2px]"
        />
        <div className="text-neutral-dark-500 text-[28px] leading-[39px] font-medium -tracking-[1.12px]">
          See how SolarSquare is powering homes across India
        </div>
      </div>
      <Button
        variant="primary"
        content="See SolarSquare Homes"
        className="animate-btn !h-fit !w-fit px-16 py-8 text-[32px]"
        onClick={handleExploreClick}
      />
    </div>
  );
};

export default HomePage;
