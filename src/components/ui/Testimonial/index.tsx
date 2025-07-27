'use client';
import { ArrowIcon, QuotesIcon } from '@/components/icons';
import { TESTIMONIALS } from '@/data/constants';
import Image from 'next/image';
import { useState } from 'react';

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? TESTIMONIALS.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="bg-background-dark-200 mx-auto w-[360px] rounded-2xl border border-neutral-100 p-5 shadow-(--testimonial-shadow)">
      <div className="relative rounded-lg">
        <div className="absolute inset-0 -bottom-1 z-[0] bg-linear-(--testimonial-gradient)" />
        <div className="absolute inset-0 z-[1] bg-radial-(--testimonial-radial)" />
        <div className="absolute inset-x-4 top-4 z-[2] flex justify-end gap-3">
          <ArrowIcon onClick={handlePrev} className="cursor-pointer" />
          <ArrowIcon
            onClick={handleNext}
            className="rotate-180 cursor-pointer"
          />
        </div>
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={TESTIMONIALS[currentIndex].image}
          alt={TESTIMONIALS[currentIndex].name}
          priority={true}
          className="w-full select-none"
        />
        <div className="absolute inset-x-0 bottom-0 left-4 z-[3] select-none">
          <h3 className="font-dm-sans text-2xl/[33px] font-bold tracking-[-0.96px] text-white text-shadow-(--testimonial-content)">
            {TESTIMONIALS[currentIndex].name}
          </h3>
          <p className="font-dm-sans text-background-400 text-sm tracking-[-0.28px] text-shadow-(--testimonial-content)">
            {TESTIMONIALS[currentIndex].city}
          </p>
        </div>
      </div>
      <div className="relative mt-5">
        <p className="font-dm-sans z-10 mb-4 line-clamp-6 text-2xl/[33px] font-medium tracking-[-0.96px] text-white">
          {TESTIMONIALS[currentIndex].feedback}
        </p>
        <QuotesIcon className="absolute top-0 right-0 z-0" />
        <span className="text-neutral-450 font-dm-sans text-base leading-normal font-medium tracking-[-0.32px]">
          Installed on {TESTIMONIALS[currentIndex].date}
        </span>
      </div>
    </div>
  );
};

export default Testimonial;
