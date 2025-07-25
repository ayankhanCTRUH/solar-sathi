import { ChevronIcon, Home } from '@/components/icons';
import Link from 'next/link';

const BreadCrumbs = () => {
  return (
    <div className="bg-background-dark-300 font-dm-sans border-background-dark-100 mt-10 flex items-center gap-1 rounded-xl border-[1.5px] p-4 text-2xl text-white">
      <Link href="/" passHref className="flex items-center gap-1 font-normal">
        <Home className="m-2 shrink-0" />
        India
      </Link>
      <ChevronIcon className="shrink-0" />
      <Link href="/maharashtra" className="font-normal">
        Maharashtra
      </Link>
      <ChevronIcon className="shrink-0" />
      {/* selected */}
      <Link
        href="/maharashtra/nagpur"
        className="text-secondary-500 font-semibold"
      >
        Nagpur
      </Link>
    </div>
  );
};

export default BreadCrumbs;
