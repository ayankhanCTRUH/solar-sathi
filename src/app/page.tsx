'use client';
import PulseDot from '@/components/layout/MiddleSection/components/PulseDot';
import { PULSE_DOT_DATA } from '@/data/constants';
import { useSolarState } from '@/lib/store';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const MapSection = dynamic(() => import('@/components/layout/MapSection'), {
  ssr: false,
});

export default function Home() {
  const { isHomePage } = useSolarState();

  return isHomePage ? (
    <div className="relative flex h-[calc(100vh-90px)] items-center justify-center">
      <div className="absolute inset-0 bg-linear-(--home-page-gradient)" />
      <Image
        height={0}
        width={0}
        sizes="100vw"
        alt="india"
        src="/images/india-map.webp"
        className="h-full w-full object-contain"
      />
      {PULSE_DOT_DATA.map((item, index) => (
        <PulseDot key={index} className={item} />
      ))}
    </div>
  ) : (
    <MapSection />
  );
}
