'use client';

import BreadCrumbs from '@/components/ui/BreadCrumbs';
import MetricsCard from '@/components/ui/MetricsCard';
import { DEFAULT_BREADCRUMBS, INITIAL_METRICS_DATA } from '@/data/constants';
import useQueryParams from '@/hooks/useQueryParams';
import { useMapStateAndCityState, useSolarState } from '@/lib/store';
import { formatNumWithUnits } from '@/lib/utils';
import { useGetExpCenter } from '@/services/exp-center-service';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const LeftSection = () => {
  const { queryParams, removeParam } = useQueryParams();
  const { setBackToState, setBackToCountry } = useMapStateAndCityState();
  const { setIsHomePage } = useSolarState();
  const getExpCenterQuery = useGetExpCenter();
  const [metricsData, setMetricsData] = useState(INITIAL_METRICS_DATA);

  const [breadCrumbs, setBreadCrumbs] = useState(() => {
    return [
      {
        ...DEFAULT_BREADCRUMBS[0],
        onClick: () => {
          removeParam('state');
          removeParam('city');
          removeParam('pincode');
          setBreadCrumbs((prev) =>
            prev.filter(
              (b) =>
                b.key !== 'state' && b.key !== 'city' && b.key !== 'pincode'
            )
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
            removeParam('pincode');
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
          onClick: () => removeParam('pincode'),
        });
      }

      return updated;
    });

    getExpCenterQuery.mutate(undefined, {
      onSuccess: (data) => {
        setMetricsData((prev) => [
          {
            ...prev[0],
            metricContents: formatNumWithUnits({ num: data.totalCount }),
          },
          {
            ...prev[1],
            metricContents: formatNumWithUnits({
              num: data.totalLifetimeSavings,
              isRupees: true,
            }),
          },
          {
            ...prev[2],
            metricContents: formatNumWithUnits({
              num: data.totalSubsidyAmount,
              isRupees: true,
            }),
          },
        ]);
      },
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

      <div className="grid flex-grow grid-cols-1 gap-5">
        {metricsData?.map((metric, index) => (
          <MetricsCard
            key={index}
            data={metric}
            isLoading={getExpCenterQuery.isPending}
            isError={getExpCenterQuery.isError}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftSection;
