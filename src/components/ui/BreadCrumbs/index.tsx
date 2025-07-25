import { ChevronIcon, Home } from '@/components/icons';
import React from 'react';

const BreadCrumbs = () => {
  return (
    <div className="bg-background-dark-300 font-dm-sans border-background-dark-100 mt-10 flex items-center gap-1 rounded-xl border-[1.5px] p-4 text-2xl text-white">
      <Home className="m-2 shrink-0" />
      <span className="">India</span>
      <ChevronIcon className="shrink-0" />
      <span className="">Maharashtra</span>
      {/* <ChevronIcon className="shrink-0" />
      <span className="">Nagpur</span> */}
    </div>
  );
};

export default BreadCrumbs;
