import { useQuery } from '@tanstack/react-query';
import { getTestimonials } from '../api';
import { TestimonialAPIType, TestimonialType } from '@/types';

export const useGetTestimonials = () => {
  return useQuery({
    queryKey: ['get_testimonials'],
    queryFn: getTestimonials,
    select: (data): TestimonialType[] => {
      return data?.data?.map((item: TestimonialAPIType) => ({
        ...item,
        image: `${process.env.NEXT_PUBLIC_GATEWAY_BASE_URL}${item.image.formats.small.url}`,
      }));
    },
  });
};
