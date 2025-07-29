import { RupeeIcon, SolarHomeIcon, SubsidyIcon } from '@/components/icons';
import { BreadCrumbItemType, MetricsCardProps } from '@/types';
import { LeaderBoardData } from '@/types';

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
