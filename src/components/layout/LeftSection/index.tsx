'use client';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import MetricsCard from '@/components/ui/MetricsCard';
import { METRICS_DATA } from '@/data/constants';
import useQueryParams from '@/hooks/useQueryParams';
import { useMapStateAndCityState, useSolarState } from '@/lib/store';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

const LeftSection = () => {
  const { queryParams, setParams, removeParam } = useQueryParams();
  const { setBackToState, setBackToCountry } = useMapStateAndCityState();
  const DEFAULT_BREAD_CRUMBS = useMemo(
    () => [
      {
        key: 'country',
        label: 'India',
        onClick: () => {
          removeParam('state');
          removeParam('city');
          setBackToCountry();
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const { setIsHomePage } = useSolarState();
  const [breadCrumbs, setBreadCrumbs] = useState(DEFAULT_BREAD_CRUMBS);

  useEffect(() => {
    console.log('queryParams:-', queryParams);
    const isStateQuery = breadCrumbs.find(
      (item) => item.label === queryParams?.state
    );
    const isCityQuery = breadCrumbs.find(
      (item) => item.key === 'city' && item.label === queryParams?.city
    );
    console.log('isStateQuery', isStateQuery);
    if (!isStateQuery && queryParams?.state) {
      console.log('state:-', queryParams?.state);
      setBreadCrumbs((prev) => [
        ...prev,
        {
          key: 'state',
          label: queryParams?.state,
          onClick: () => {
            removeParam('city');
            setBackToState();
          },
        },
      ]);
    } else if (!isCityQuery && queryParams?.city) {
      console.log('city:-', queryParams?.city);
      setBreadCrumbs((prev) => [
        ...prev,
        {
          key: 'city',
          label: queryParams?.city,
          onClick: () => {},
        },
      ]);
    } else {
      setBreadCrumbs(DEFAULT_BREAD_CRUMBS);
      setParams({ country: 'India' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  useEffect(() => {
    console.log('breadCrumbs:-', breadCrumbs);
  }, [breadCrumbs]);

  return (
    <div className="pointer-events-auto flex h-full max-w-[320px] min-w-[320px] flex-col gap-5">
      <Image
        width={0}
        height={0}
        src="/icons/logo.svg"
        alt="logo"
        className="mb-3 h-full max-h-37 w-full max-w-52 cursor-pointer"
        onClick={() => setIsHomePage(true)}
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
