'use client';
import { useSolarState } from '@/lib/store';
import { useGetMapData, useGetPincodeData } from '@/services/map-service';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const MapSection = dynamic(() => import('@/components/layout/MapSection'), {
  ssr: false,
});
const LandingPageMap = dynamic(() => import('@/components/layout/LandingPage'), {
  ssr: false,
});

// In your Home component
export default function Home() {
  const { isHomePage} = useSolarState();

  return isHomePage ? <LandingPageMap /> : <MapSection />
}