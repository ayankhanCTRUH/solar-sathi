import { MapDataType, PincodeDataType } from '@/types';

export const formatDate = (dateString: string) => {
  if (!dateString) return;

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  })
    ?.format(date)
    ?.replace(' ', ', ');
};

// map section

export const getCitiesByState = (
  stateName: string,
  mapData: MapDataType
): { cityName: string; count: number; pincode: string }[] | null => {
  const state = mapData[stateName];

  if (!state) {
    console.error(`State "${stateName}" not found.`);
    return null;
  }

  return Object.keys(state.cities).map((cityName) => ({
    cityName,
    count: state.cities[cityName].count,
    pincode: state.cities[cityName].active_pincode[0],
  }));
};

export const getStateCount = (
  stateName: string,
  mapData: MapDataType
): number | null => {
  const state = mapData[stateName];

  if (!state) {
    console.error(`No state with name ${stateName} is found`);
    return null;
  }

  return state.total_count;
};

export const getPincodesByCity = (
  stateName: string,
  cityName: string,
  mapData: MapDataType
): string[] | null => {
  const state = mapData[stateName];

  if (!state) {
    console.error(`State "${stateName}" not found.`);
    return null;
  }

  const city = state.cities[cityName];

  if (!city) {
    console.error(`City "${cityName}" not found in state "${stateName}".`);
    return null;
  }

  return city.active_pincode;
};

export const getCoordinatesByPincode = (
  pincode: number,
  pincodeData: PincodeDataType[]
): [number, number] | undefined => {
  const pincodeRecord = pincodeData.find((entry) => entry.pincode === pincode);

  if (!pincodeRecord) {
    return undefined;
  }
  const [longitude, latitude] = pincodeRecord.coordinates;

  return [latitude, longitude];
};

export const formatNumWithUnits = ({
  num,
  isRupees = false,
  unitHighlighted = true,
}: {
  num: number;
  isRupees?: boolean;
  unitHighlighted?: boolean;
}) => {
  if (num >= 10000000) {
    // 1 crore and above
    return unitHighlighted
      ? [
          {
            text: `${isRupees ? '₹' : ''}${(num / 10000000).toFixed(2).replace(/\.00$/, '')}`,
          },
          { text: 'Cr', highlighted: true },
        ]
      : [
          {
            text: `${isRupees ? '₹' : ''}${(num / 10000000).toFixed(2).replace(/\.00$/, '')}Cr`,
          },
        ];
  } else if (num >= 100000) {
    // between 1 lakh and 1 crore
    return unitHighlighted
      ? [
          {
            text: `${isRupees ? '₹' : ''}${(num / 100000).toFixed(2).replace(/\.00$/, '')}`,
          },
          { text: 'L', highlighted: true },
        ]
      : [
          {
            text: `${isRupees ? '₹' : ''}${(num / 100000).toFixed(2).replace(/\.00$/, '')}L`,
          },
        ];
  } else if (num >= 10000) {
    // between 10k and 1 lakh
    return unitHighlighted
      ? [
          {
            text: `${isRupees ? '₹' : ''}${(num / 1000).toFixed(2).replace(/\.00$/, '')}`,
          },
          { text: 'K', highlighted: true },
        ]
      : [
          {
            text: `${isRupees ? '₹' : ''}${(num / 1000).toFixed(2).replace(/\.00$/, '')}K`,
          },
        ];
  } else {
    // Less than 10k
    return unitHighlighted
      ? [{ text: `${isRupees ? '₹' : ''}${num.toLocaleString()}` }]
      : [{ text: `${isRupees ? '₹' : ''}${num.toLocaleString()}` }];
  }
};
