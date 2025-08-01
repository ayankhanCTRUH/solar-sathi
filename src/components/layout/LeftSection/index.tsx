'use client';

import BreadCrumbs from '@/components/ui/BreadCrumbs';
import MetricsCard from '@/components/ui/MetricsCard';
import { DEFAULT_BREADCRUMBS, METRICS_DATA } from '@/data/constants';
import useQueryParams from '@/hooks/useQueryParams';
import { useMapStateAndCityState, useSolarState } from '@/lib/store';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const LeftSection = () => {
  const { queryParams, removeParam } = useQueryParams();
  const { setBackToState, setBackToCountry } = useMapStateAndCityState();
  const { setIsHomePage } = useSolarState();

  const [breadCrumbs, setBreadCrumbs] = useState(() => {
    return [
      {
        ...DEFAULT_BREADCRUMBS[0],
        onClick: () => {
          removeParam('state');
          removeParam('city');
          setBreadCrumbs((prev) =>
            prev.filter((b) => b.key !== 'state' && b.key !== 'city')
          );
          setBackToCountry();
        },
      },
    ];
  });

  useEffect(() => {
    const { state, city } = queryParams || {};

    setBreadCrumbs((prev) => {
      const updated = [...prev];

      const hasState = updated.some(
        (item) => item.key === 'state' && item.label === state
      );
      const hasCity = updated.some(
        (item) => item.key === 'city' && item.label === city
      );

      if (state && !hasState) {
        updated.push({
          key: 'state',
          label: state,
          onClick: () => {
            removeParam('city');
            setBreadCrumbs((prev) =>
              prev.filter((item) => item.key !== 'city')
            );
            setBackToState();
          },
        });
      }

      if (city && !hasCity) {
        updated.push({
          key: 'city',
          label: city,
          onClick: () => {},
        });
      }

      return updated;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  return (
    <div className="pointer-events-auto flex h-full max-w-[320px] min-w-[320px] flex-col gap-5">
      <Image
        width={0}
        height={0}
        src="/icons/logo.svg"
        alt="logo"
        className="mb-3 h-full max-h-37 w-full max-w-52 cursor-pointer"
        onClick={() => setIsHomePage(true)}
        priority
      />

      <BreadCrumbs items={breadCrumbs} />

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
