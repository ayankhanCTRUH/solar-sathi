import axios from 'axios';

const GATEWAY_BASE_URL = process.env.NEXT_PUBLIC_GATEWAY_BASE_URL;

const testimonialAction = axios.create({
  baseURL: GATEWAY_BASE_URL,
});

export const getTestimonials = async () => {
  const response = await testimonialAction.get('/api/solar-sathi-testimonials');
  return response.data;
};
