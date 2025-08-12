import { RupeeIcon, SolarHomeIcon, SubsidyIcon } from '@/components/icons';
import { MetricsCardProps, StateDataType } from '@/types';
import { LeaderBoardData } from '@/types';

export const INITIAL_METRICS_DATA: MetricsCardProps[] = [
  {
    title: 'Solarsquare Homes',
    icon: SolarHomeIcon,
  },
  {
    title: 'Annual Savings Generated',
    icon: RupeeIcon,
  },

  {
    title: 'Govt. Subsidy Disbursed',
    icon: SubsidyIcon,
  },
];

export const PIN_INPUT_LIMIT = 6;

// map section

export const MAP_STYLE_DATA = {
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

export const INITIAL_MAP_STORE_DATA = {
  isHomePage: true,
  mapData: {},
  pincodeData: [],
};

export const STATE_NAME_DATA: string[] = [
  'Delhi',
  'Rajasthan',
  'Uttar Pradesh',
  'Gujarat',
  'Madhya Pradesh',
  'Maharashtra',
  'Telangana',
  'Karnataka',
  'Tamil Nadu',
];

export const STATE_DATA: StateDataType = {
  Delhi: {
    value: 783,
    latLng: [28.696433, 77.035625],
  },
  Rajasthan: {
    value: 1650,
    latLng: [26.145328, 73.962306],
  },
  'Uttar Pradesh': {
    value: 2400,
    latLng: [26.919632, 80.583116],
  },
  Gujarat: {
    value: 2750,
    latLng: [22.736715, 71.513644],
  },
  'Madhya Pradesh': {
    value: 6900,
    latLng: [23.043479, 77.621057],
  },
  Maharashtra: {
    value: 7450,
    latLng: [19.400641, 75.572232],
  },
  Telangana: {
    value: 2100,
    latLng: [18.226616, 79.293185],
  },
  Karnataka: {
    value: 4500,
    latLng: [15.329437, 75.72107],
  },
  'Tamil Nadu': {
    value: 1450,
    latLng: [11.080035, 78.201705],
  },
};

export const DEFAULT_BREADCRUMBS = [
  {
    key: 'country',
    label: 'India',
    onClick: null, // assigned in component to access current closures
  },
];
