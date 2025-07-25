import { RupeeIcon, SolarHomeIcon, SubsidyIcon } from '@/components/icons';
import { MetricsCardProps } from '@/types';

// TODO: testimonials data need to be updated
export const TESTIMONIALS = [
  {
    name: 'Jay Sarawan',
    city: 'Jabalpur, MP',
    feedback:
      'From start to finish, this solar team exceeded all expectations. Their professionalism, knowledge, and attention to detail made the entire process smooth and stress-free.',
    date: 'Feb, 2025',
    image: '/images/testimonial.webp',
  },
  {
    name: 'John Doe',
    city: 'Hyderabad, Telangana',
    feedback:
      'From start to finish, this solar team exceeded all expectations. Their professionalism, knowledge, and attention to detail made the entire process smooth and stress-free.',
    date: 'Jan, 2025',
    image: '/images/testimonial.webp',
  },
  {
    name: 'John Wick',
    city: 'HSR Layout, Bangalore',
    feedback:
      'From start to finish, this solar team exceeded all expectations. Their professionalism, knowledge, and attention to detail made the entire process smooth and stress-free.',
    date: 'Jan, 2025',
    image: '/images/testimonial.webp',
  },
];

export const METRICS_DATA: MetricsCardProps[] = [
  {
    title: 'Solarsquare Homes',
    icon: SolarHomeIcon,
    metricContents: [{ text: '29,983+' }],
  },
  {
    title: 'Annual Savings Generated',
    icon: RupeeIcon,
    metricContents: [{ text: '₹53.9' }, { text: 'Cr', highlighted: true }],
  },

  {
    title: 'Govt. Subsidy Disbursed',
    icon: SubsidyIcon,
    metricContents: [{ text: '₹53.9' }, { text: 'Cr', highlighted: true }],
  },
];
