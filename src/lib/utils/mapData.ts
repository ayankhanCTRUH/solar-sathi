interface StateData {
  total_count: number;
  cities: Record<string, CityData>;
}

interface CityData {
  count: number;
  active_pincode: string[];
}

interface MapData {
  [stateName: string]: StateData;
}

let mapData: MapData = {};

export function getCitiesByState(
  stateName: string
): { cityName: string; count: number; pincode: string }[] | null {
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
}

export function getStateCount(stateName: string): number | null {
  const state = mapData[stateName];

  if (!state) {
    console.error(`No state with name ${stateName} is found`);
    return null;
  }

  return state.total_count;
}

export function getPincodesByCity(
  stateName: string,
  cityName: string
): string[] | null {
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
}

export async function fetchMapData() {
  try {
    const response = await fetch(
      'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjcjr04_Fjgu888Dv9Pg0ZTWqn6YmJG1eR1EEdsF1KgxtzVhOzV4ZooA2mSuPzg_Od9xTnMXyRyq41WFAJxS8Q3Uo7HM4WErFi5_pmnBBuAbEA6YM1PsWazFJYk5utmzGf9_Y9EeUVXn6OoQsda56QvChEIgzPuoY2uXTxAh5bF2A9ResicOvCuBVAD4WI3X_JEUhxIykvWHVwFuGOLet2sQFiggpk-aHTtJasigPqS13qbBh7kjGL6rQFuEU7bPyid0NlPjxLI5lQX3mNVmlO0u7f4Vg&lib=MPczDkIBLh3tsk_aI0KZvWKEkoe8mQgmB'
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    mapData = data.states_cities_counts;
    console.log(mapData);
  } catch (error) {
    console.error('Error fetching map data:', error);
    throw error;
  }
}
