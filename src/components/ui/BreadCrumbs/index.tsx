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

  return (
    <div className="bg-background-dark-300 font-dm-sans border-background-dark-100 mt-10 flex items-center gap-1 rounded-xl border-[1.5px] p-4 text-2xl text-white">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;
        const shouldTruncate = items.length > 2;

        if (isFirst && items.length > 1) {
          return (
            <Fragment key={index}>
              <Link
                href={item.href}
                className="flex items-center gap-1 font-normal"
              >
                <HomeIcon className="m-2 shrink-0" />
              </Link>
              <ChevronIcon className="shrink-0" />
            </Fragment>
          );
        }

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
              <span
                className={shouldTruncate && !isLast ? 'max-w-20 truncate' : ''}
              >
                {item.label}
              </span>
            </Link>
            {!isLast && <ChevronIcon className="shrink-0" />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
