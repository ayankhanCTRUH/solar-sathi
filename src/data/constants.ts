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

// TODO: cities data need to be fetched from API
export const CITIES_DATA: LeaderBoardData[] = [
  { rank: 1, city: 'Nagpur', homesSolarized: '2,500' },
  { rank: 2, city: 'Nashik', homesSolarized: '1,200' },
  { rank: 3, city: 'Pune', homesSolarized: '1,050' },
];

export const PIN_INPUT_LIMIT = 6;
