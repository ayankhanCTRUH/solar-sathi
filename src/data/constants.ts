import { RupeeIcon, SolarHomeIcon, SubsidyIcon } from '@/components/icons';
import { BreadCrumbItemType, MetricsCardProps } from '@/types';
import { LeaderBoardData } from '@/types';

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

export const mapStylingParams = {
  fillColor: '#151930',
  weight: 2,
  opacity: 1,
  color: '#3f4774',
  fillOpacity: 1,
  className: 'state',

  // Highlight/focused states styling
  focusWeight: 3,
  focusColor: '#49549d',
  focusFillColor: '#1b1f3f',
  focusFillOpacity: 0.9,
};
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

export const BREADCRUMBS_DATA: BreadCrumbItemType[] = [
  { href: '/', label: 'India' },
  { href: '/maharashtra', label: 'Maharashtra' },
  { href: '/maharashtra/nagpur', label: 'Nagpur' },
];

// TODO: cities data need to be fetched from API
export const CITIES_DATA: LeaderBoardData[] = [
  { rank: 1, city: 'Nagpur', homesSolarized: '2,500' },
  { rank: 2, city: 'Nashik', homesSolarized: '1,200' },
  { rank: 3, city: 'Pune', homesSolarized: '1,050' },
];

export const PIN_INPUT_LIMIT = 6;

export const TABLE_HEADINGS = ['Rank', 'City', 'Homes Solarized'];
