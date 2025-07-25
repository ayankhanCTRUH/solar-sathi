import { ChevronIcon, HomeIcon } from '@/components/icons';
import Link from 'next/link';
import { Fragment } from 'react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadCrumbsProps {
  items: BreadcrumbItem[];
}

const BreadCrumbs = ({ items }: BreadCrumbsProps) => {
  if (!items?.length) return null;

  return (
    <div
      className="bg-background-dark-300 font-dm-sans border-background-dark-100 mt-10 flex w-full items-center gap-0.5 rounded-xl border-[1.5px] p-4 text-white"
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        const shouldShowLabel = items.length <= 2 || !isFirst;
        const shouldTruncate = items.length > 2 && !isFirst && !isLast;

        return (
          <Fragment key={index}>
            <Link
              href={item.href}
              className={`flex items-center gap-1 text-2xl/8.5 select-none ${
                isLast && !isFirst
                  ? 'text-secondary-500 pointer-events-none font-semibold'
                  : 'font-normal'
              }`}
            >
              {isFirst && <HomeIcon className="m-2 shrink-0" />}
              {shouldShowLabel && (
                <span
                  className={`${shouldTruncate ? 'max-w-20 truncate' : ''}`}
                >
                  {item.label}
                </span>
              )}
            </Link>
            {!isLast && <ChevronIcon className="shrink-0" />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
