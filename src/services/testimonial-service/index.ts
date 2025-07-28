import { useQuery } from '@tanstack/react-query';
import { getTestimonials } from '../api';

export const useGetTestimonials = () => {
  return useQuery({
    queryKey: ['get_testimonials'],
    queryFn: () => getTestimonials(),
  });
};
