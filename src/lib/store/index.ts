import { INITIAL_MAP_STORE_DATA } from '@/data/constants';
import { MapDataStateType } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSolarState = create<MapDataStateType>()(
  persist(
    (set) => ({
      ...INITIAL_MAP_STORE_DATA,
      setIsHomePage: (data) => set({ isHomePage: data }),
      setMapData: (data) => set({ mapData: data }),
      setPincodeData: (data) => set({ pincodeData: data }),
    }),
    {
      name: 'map-store',
      partialize: (state) => ({
        mapData: state.mapData,
        pincodeData: state.pincodeData,
      }),
    }
  )
);
