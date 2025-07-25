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
  if (!items || items.length === 0) return null;

  const shouldTruncate = items.length > 2;

  return (
    <div className="bg-background-dark-300 font-dm-sans border-background-dark-100 mt-10 flex items-center gap-1 rounded-xl border-[1.5px] p-4 text-2xl text-white">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;
        const showLabel = items.length <= 2 || !isFirst;

        return (
          <Fragment key={index}>
            <Link
              href={item.href}
              className={`flex items-center gap-1 ${
                isLast
                  ? 'text-secondary-500 pointer-events-none font-semibold'
                  : 'font-normal'
              }`}
            >
              {isFirst && <HomeIcon className="m-2 shrink-0" />}
              {showLabel && (
                <span
                  className={
                    shouldTruncate && !isLast && !isFirst
                      ? 'max-w-20 truncate'
                      : ''
                  }
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
