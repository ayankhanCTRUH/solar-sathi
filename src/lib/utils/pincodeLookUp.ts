export type PincodeData = {
  pincode: number;
  city: string;
  state: string;
  coordinates: [number, number];
};

let pincodeData: PincodeData[] = [];

export const loadPincodeData = async (): Promise<void> => {
  try {
    const response = await fetch('/mapData/json/Pincode.json');
    if (!response.ok) {
      throw new Error('Failed to fetch pincode data');
    }
    pincodeData = await response.json();
  } catch (error) {
    console.error('Error loading pincode data: ', error);
  }
};

export const getCoordinatesByPincode = (
  pincode: number
): [number, number] | undefined => {
  const pincodeRecord = pincodeData.find((entry) => entry.pincode === pincode);

  if (!pincodeRecord) {
    return undefined;
  }
  const [longitude, latitude] = pincodeRecord.coordinates;

  return [latitude, longitude];
};
