'use client';
import dynamic from 'next/dynamic';

const MapSection = dynamic(
  () => import('@/components/layout/MapSection'),{
    ssr:false
  }
)

export default function Home() {
  return <MapSection />;
}
