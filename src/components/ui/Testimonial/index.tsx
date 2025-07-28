'use client';
import { ArrowIcon, QuotesIcon } from '@/components/icons';
import { formatDate } from '@/lib/utils/utils';
import { useGetTestimonials } from '@/services/testimonial-service';
import { TestimonialType } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import TestimonialSkeleton from '../Skeleton/components/TestimonialSkeleton';
import ShowError from '../ShowError';
import EmptyData from '../EmptyData/EmptyData';

const Testimonial = () => {
  const getTestimonialsQuery = useGetTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);

  const allTestimonials: TestimonialType[] = getTestimonialsQuery?.data?.data;
  const currentTestimonial = allTestimonials?.[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? allTestimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === allTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (getTestimonialsQuery?.isPending) return <TestimonialSkeleton />;

  if (getTestimonialsQuery?.isError)
    return (
      <ShowError
        title="Something went wrong!"
        description="Error loading testimonials. Please try again later."
        className="bg-background-dark-200 w-[360px] flex-grow rounded-2xl"
      />
    );

  if (!allTestimonials?.length)
    return (
      <EmptyData
        content="No testimonials found!"
        className="bg-background-dark-200 w-[360px] flex-grow rounded-2xl"
      />
    );

  return (
    <div className="bg-background-dark-200 shadow-smoke mx-auto flex w-[360px] flex-grow flex-col rounded-2xl border border-neutral-100 p-5">
      <div className="relative flex-grow rounded-lg">
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
          src="/images/testimonial.webp"
          alt={currentTestimonial?.name}
          className="w-full select-none"
        />
        <div className="absolute inset-x-0 bottom-0 left-4 z-[3] select-none">
          <h3 className="font-dm-sans text-shadow-testimonial-content text-2xl/[33px] font-bold tracking-[-0.96px] text-white">
            {currentTestimonial?.name}
          </h3>
          <p className="font-dm-sans text-background-400 text-shadow-testimonial-content text-sm tracking-[-0.28px]">
            {currentTestimonial?.address}
          </p>
        </div>
      </div>
      <div className="relative mt-5">
        <p className="font-dm-sans z-10 mb-4 line-clamp-6 text-2xl/[33px] font-medium tracking-[-0.96px] text-white">
          {currentTestimonial?.description}
        </p>
        <QuotesIcon className="absolute top-0 right-0 z-0" />
        <span className="text-neutral-450 font-dm-sans text-base leading-normal font-medium tracking-[-0.32px]">
          Installed on {formatDate(currentTestimonial?.installedOn)}
        </span>
      </div>
    </div>
  );
};

export default Testimonial;
