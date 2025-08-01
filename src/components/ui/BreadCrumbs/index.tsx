import { ChevronIcon, HomeIcon } from '@/components/icons';
import { BreadCrumbItemType } from '@/types';
import { Fragment, useEffect } from 'react';

const BreadCrumbs = ({ items }: { items: BreadCrumbItemType[] }) => {
  if (!items?.length) return null;

  return (
    <div
      className="bg-background-dark-300 font-dm-sans border-background-dark-100 flex w-full items-center gap-0.5 rounded-xl border-[1.5px] p-4 text-white"
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        const isSecond = index === 1;
        const shouldShowLabel = items.length <= 2 || !isFirst;
        const shouldTruncate =
          (items.length === 2 && isSecond && item.label.length > 11) ||
          (items.length === 3 && isSecond && item.label.length > 6) ||
          (items.length > 2 && isLast && item.label.length > 6);
        return (
          <Fragment key={index}>
            <span
              onClick={() => item.onClick?.()}
              className={`flex items-center gap-1 text-2xl/8.5 select-none ${
                isLast && !isFirst
                  ? 'text-secondary-500 pointer-events-none font-semibold'
                  : 'font-normal'
              }`}
            >
              {isFirst && <HomeIcon className="m-2 shrink-0" />}
              {shouldShowLabel && (
                <span
                  className={`${shouldTruncate ? 'max-w-20 truncate' : ''} whitespace-nowrap`}
                >
                  {item.label}
                </span>
              )}
            </span>
            {!isLast && <ChevronIcon className="shrink-0" />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
