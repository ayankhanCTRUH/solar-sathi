'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_STYLE_DATA, STATE_DATA, STATE_NAME_DATA } from '@/data/constants';
import {
  getCitiesByState,
  getCoordinatesByPincode,
  getPincodesByCity,
  getStateCount,
} from '@/lib/utils';
import {
  useGetGeoJSONData,
  useGetMapData,
  useGetPincodeData,
} from '@/services/map-service';
import { useMapStateAndCityState, useSolarState } from '@/lib/store';
import { MapDataType, PincodeDataType } from '@/types';
import useQueryParams from '@/hooks/useQueryParams';

// TODO: define types wherever used `any` as a type in this component

export interface CurrentLocationType {
  state: string | null;
  city: string | null;
  pincode: string | null;
}

interface MapRefs {
  map: L.Map | null;
  indiaGeoJsonLayer: L.GeoJSON | null;
  stateGeoJsonLayer: L.GeoJSON | null;
  indiaMarkers: L.LayerGroup | null;
  stateMarkers: L.LayerGroup | null;
  cityMarkers: L.LayerGroup | null;
  currentStateLayer: L.GeoJSON | null;
  stateLayers: L.Layer[];
}

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const mapRefsRef = useRef<MapRefs>({
    map: null,
    indiaGeoJsonLayer: null,
    stateGeoJsonLayer: null,
    indiaMarkers: null,
    stateMarkers: null,
    cityMarkers: null,
    currentStateLayer: null,
    stateLayers: [],
  });
  const keyboardListenerRef = useRef<((e: KeyboardEvent) => void) | null>(null);

  const [currentLocationData, setCurrentLocationData] =
    useState<CurrentLocationType>({
      state: null,
      city: null,
      pincode: null,
    });
  const [currentStateName, setCurrentStateName] = useState<string | null>(null);
  const currStateName = useRef<string | null>(null);

  // Queries
  const getMapDataQuery = useGetMapData({ enabled: true });
  const getStateGeoJSONDataQuery = useGetGeoJSONData({
    enabled: false,
    fileName: currentLocationData.state,
  });
  const getIndiaGeoJSONDataQuery = useGetGeoJSONData({
    enabled: false,
    fileName: 'india',
  });
  const getPincodeDataQuery = useGetPincodeData({ enabled: false });

  // Store actions
  const { setMapData, setPincodeData } = useSolarState();
  const { backTos, backToDefaultValues } = useMapStateAndCityState();
  const { setParams } = useQueryParams();

  // Memoized style configurations
  const mapStyles = useMemo(
    () => ({
      focusStyle: {
        weight: MAP_STYLE_DATA.focusWeight,
        color: MAP_STYLE_DATA.focusColor,
        fillColor: MAP_STYLE_DATA.focusFillColor,
        fillOpacity: MAP_STYLE_DATA.focusFillOpacity,
      },
      defaultStyle: {
        fillColor: MAP_STYLE_DATA.fillColor,
        weight: MAP_STYLE_DATA.weight,
        opacity: MAP_STYLE_DATA.opacity,
        color: MAP_STYLE_DATA.color,
        fillOpacity: MAP_STYLE_DATA.fillOpacity,
      },
    }),
    []
  );

  // Update URL params when state/city/pincode changes
  useEffect(() => {
    const params: Record<string, string> = {};
    if (currentLocationData.state) params.state = currentLocationData.state;
    if (currentLocationData.city) params.city = currentLocationData.city;
    if (currentLocationData.pincode)
      params.pincode = currentLocationData.pincode;
    if (Object.keys(params).length > 0) setParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocationData]);

  // Utility functions
  const focusLayer = useCallback(
    (layer: L.GeoJSON) => {
      layer.setStyle(mapStyles.focusStyle);
      layer.bringToFront();
    },
    [mapStyles.focusStyle]
  );

  const unfocusMap = useCallback((layers: L.Layer[]) => {
    const { indiaGeoJsonLayer } = mapRefsRef.current;
    if (!indiaGeoJsonLayer) return;

    layers.forEach((layer) => {
      indiaGeoJsonLayer.resetStyle(layer);
    });
  }, []);

  // Marker creation functions
  const createMarkerIcon = useCallback(
    (content: string, label: string, size: [number, number] = [60, 80]) => {
      return L.divIcon({
        className: 'text-center',
        html: `
        <div class="flex flex-col items-center">
          ${content}
          <div class="mb-2.5">
            <img class="marker" src="/icons/marker.svg" alt="Marker" />
          </div>
          <div class="relative -top-3.5 w-auto rounded-[20px] bg-white p-1 text-xs font-normal font-dm-sans text-black whitespace-nowrap">${label}</div>
        </div>
      `,
        iconSize: size,
      });
    },
    []
  );

  const createIndiaMarkers = useCallback(
    (
      stateName: string,
      houseCount: number,
      latLng: [number, number],
      layer: L.GeoJSON,
      mapData: MapDataType,
      pincodeData: PincodeDataType[]
    ) => {
      const content = `<div class="relative top-3.5 text-lg font-dm-sans font-bold text-white">${houseCount.toLocaleString()}</div>`;
      const markerIcon = createMarkerIcon(content, stateName);
      const marker = L.marker(latLng, { icon: markerIcon }) as L.Marker & {
        name: string;
      };
      marker.name = stateName;

      marker.on('click', () => {
        const { map, indiaMarkers } = mapRefsRef.current;
        if (!map || !indiaMarkers) return;

        map.fitBounds(layer.getBounds());
        unfocusMap(mapRefsRef.current.stateLayers);
        focusLayer(layer);
        mapRefsRef.current.currentStateLayer = layer;
        setCurrentLocationData({ state: stateName, city: null, pincode: null });
        setCurrentStateName(stateName);
        currStateName.current = stateName;
        addStateMarkers(stateName, mapData, pincodeData);
        map.removeLayer(indiaMarkers);
      });

      return marker;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [createMarkerIcon, focusLayer, unfocusMap]
  );

  const createStateMarkers = useCallback(
    (
      cityName: string,
      houseCount: number,
      pincode: string,
      pincodeData: PincodeDataType[],
      mapData: MapDataType
    ) => {
      const content = `<div class="relative top-3.5 text-lg font-bold text-white">${houseCount.toLocaleString()}</div>`;
      const markerIcon = createMarkerIcon(content, cityName);
      const latLng = getCoordinatesByPincode(parseInt(pincode), pincodeData);

      if (!latLng) return null;

      const marker = L.marker(latLng, { icon: markerIcon }) as L.Marker & {
        name: string;
      };
      marker.name = cityName;

      marker.on('click', () => {
        const { map, stateMarkers, currentStateLayer } = mapRefsRef.current;
        if (!map || !stateMarkers || !currentStateLayer) return;

        map.removeLayer(stateMarkers);
        unfocusMap([currentStateLayer]);
        addCityMarkers(cityName, mapData, pincodeData);
        loadStateGeoJSONData(cityName);
      });

      return marker;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [createMarkerIcon, unfocusMap]
  );

  const createCityMarkers = useCallback(
    (pincode: number, pincodeData: PincodeDataType[]) => {
      const markerIcon = createMarkerIcon('', pincode.toString());
      const latLng = getCoordinatesByPincode(pincode, pincodeData);

      if (!latLng) {
        console.warn(`Cannot find coordinates for pincode: ${pincode}`);
        return null;
      }

      const marker = L.marker(latLng, { icon: markerIcon }) as L.Marker & {
        name: number;
      };
      marker.name = pincode;

      marker.on('click', () => {
        setCurrentLocationData((prev) => ({
          ...prev,
          pincode: pincode.toString(),
        }));
      });

      return marker;
    },
    [createMarkerIcon]
  );

  // Navigation functions
  const backToState = useCallback(() => {
    const {
      map,
      stateGeoJsonLayer,
      cityMarkers,
      stateMarkers,
      currentStateLayer,
    } = mapRefsRef.current;
    if (!map || !stateGeoJsonLayer || !cityMarkers || !stateMarkers) return;

    map.fitBounds(stateGeoJsonLayer.getBounds());
    map.removeLayer(stateGeoJsonLayer);
    map.removeLayer(cityMarkers);
    stateMarkers.addTo(map);
    cityMarkers.clearLayers();

    if (currentStateLayer) {
      focusLayer(currentStateLayer);
    }
  }, [focusLayer]);

  const backToIndia = useCallback(() => {
    const {
      map,
      indiaGeoJsonLayer,
      stateGeoJsonLayer,
      cityMarkers,
      stateMarkers,
      indiaMarkers,
    } = mapRefsRef.current;

    if (!map || !indiaGeoJsonLayer || !indiaMarkers) return;

    map.fitBounds(indiaGeoJsonLayer.getBounds());

    if (stateGeoJsonLayer && cityMarkers) {
      map.removeLayer(stateGeoJsonLayer);
      cityMarkers.clearLayers();
      map.removeLayer(cityMarkers);
    }

    if (stateMarkers) {
      map.removeLayer(stateMarkers);
      stateMarkers.clearLayers();
    }

    indiaMarkers.addTo(map);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    indiaGeoJsonLayer.getLayers().forEach((layer: any) => {
      if (STATE_NAME_DATA.includes(layer.feature?.properties.ST_NM)) {
        focusLayer(layer);
      }
    });
  }, [focusLayer]);

  // Layer management functions
  const addCityMarkers = useCallback(
    (
      cityName: string,
      mapData: MapDataType,
      pincodeData: PincodeDataType[]
    ) => {
      const { map, cityMarkers } = mapRefsRef.current;
      if (!map || !cityMarkers) return;

      setCurrentLocationData((prev) => ({
        ...prev,
        city: cityName,
        pincode: null,
      }));
      cityMarkers.addTo(map);

      if (currStateName.current) {
        const cityData = getPincodesByCity(
          currStateName.current,
          cityName,
          mapData
        );
        cityData?.forEach((pincode) => {
          const marker = createCityMarkers(parseInt(pincode), pincodeData);
          if (marker) marker.addTo(cityMarkers);
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentStateName, createCityMarkers]
  );

  const addStateMarkers = useCallback(
    (
      stateName: string,
      mapData: MapDataType,
      pincodeData: PincodeDataType[]
    ) => {
      const { stateMarkers } = mapRefsRef.current;
      if (!stateMarkers) return;

      stateMarkers.addTo(mapRefsRef.current.map!);
      const stateData = getCitiesByState(stateName, mapData);

      if (!stateData) return;

      stateData.forEach((data) => {
        const marker = createStateMarkers(
          data.cityName,
          data.count,
          data.pincode,
          pincodeData,
          mapData
        );
        if (marker) marker.addTo(stateMarkers);
      });
    },
    [createStateMarkers]
  );

  // GeoJSON loading functions
  const loadStateGeoJSONData = useCallback(
    async (cityName: string) => {
      const { map } = mapRefsRef.current;
      if (!map) return;

      try {
        const { data } = await getStateGeoJSONDataQuery.refetch();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const onEachFeature = (feature: any, layer: L.GeoJSON) => {
          const distName = feature.properties.district;

          if (cityName === distName) {
            layer.setStyle({
              ...mapStyles.focusStyle,
              pane: 'highlightPane',
            });
            layer.bringToFront();
            map.fitBounds(layer.getBounds());
          }
        };

        mapRefsRef.current.stateGeoJsonLayer = L.geoJSON(data, {
          style: () => mapStyles.defaultStyle,
          onEachFeature,
        }).addTo(map);
      } catch (error) {
        console.error('Error loading state GeoJSON data:', error);
      }
    },
    [getStateGeoJSONDataQuery, mapStyles]
  );

  const loadGeoJSONData = useCallback(
    async (
      map: L.Map,
      mapData: MapDataType,
      pincodeData: PincodeDataType[]
    ) => {
      try {
        const { data } = await getIndiaGeoJSONDataQuery.refetch();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const onEachFeature = (feature: any, layer: L.GeoJSON) => {
          const stateName = feature.properties.ST_NM;

          if (STATE_NAME_DATA.includes(stateName)) {
            const houseCount = getStateCount(stateName, mapData);
            const latLng = STATE_DATA[stateName]?.latLng;

            if (!houseCount || !latLng) return;

            const marker = createIndiaMarkers(
              stateName,
              houseCount,
              latLng,
              layer,
              mapData,
              pincodeData
            );

            if (mapRefsRef.current.indiaMarkers) {
              marker.addTo(mapRefsRef.current.indiaMarkers);
            }
            mapRefsRef.current.stateLayers.push(layer);
          }
        };

        const indiaGeoJsonLayer = L.geoJSON(data, {
          style: () => mapStyles.defaultStyle,
          onEachFeature,
        }).addTo(map);

        mapRefsRef.current.indiaGeoJsonLayer = indiaGeoJsonLayer;

        // Focus valid state layers
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        indiaGeoJsonLayer.getLayers().forEach((layer: any) => {
          if (STATE_NAME_DATA.includes(layer.feature?.properties.ST_NM)) {
            focusLayer(layer);
          }
        });

        map.setMaxBounds(indiaGeoJsonLayer.getBounds());
        map.fitBounds(indiaGeoJsonLayer.getBounds());
      } catch (error) {
        console.error('Error loading India GeoJSON data:', error);
      }
    },
    [
      getIndiaGeoJSONDataQuery,
      mapStyles.defaultStyle,
      createIndiaMarkers,
      focusLayer,
    ]
  );

  // Keyboard navigation setup
  const setupKeyboardNavigation = useCallback(() => {
    if (typeof window === 'undefined') return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'l') backToState();
      else if (e.key === 'k') backToIndia();
    };

    // Remove existing listener if any
    if (keyboardListenerRef.current) {
      window.removeEventListener('keydown', keyboardListenerRef.current);
    }

    window.addEventListener('keydown', handleKeydown);
    keyboardListenerRef.current = handleKeydown;
  }, [backToState, backToIndia]);

  // Map initialization
  const initializeMap = useCallback(async () => {
    if (!mapRef.current) return;

    try {
      // Fetch data
      const [mapDataResponse, pincodeDataResponse] = await Promise.all([
        getMapDataQuery.refetch(),
        getPincodeDataQuery.refetch(),
      ]);

      const mapData = mapDataResponse?.data?.states_cities_counts;
      const pincodeData = pincodeDataResponse?.data;

      if (!mapData || !pincodeData) {
        console.error('Failed to fetch required data');
        return;
      }

      // Update store
      setMapData(mapData);
      setPincodeData(pincodeData);

      // Create map
      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true,
        preferCanvas: true,
        minZoom: 4.5,
        maxZoom: 14,
        maxBoundsViscosity: 1.0,
      }).setView([20.5937, 78.9629], 5);

      // Create highlight pane
      map.createPane('highlightPane');
      map.getPane('highlightPane')!.style.zIndex = '550';

      // Initialize layer groups
      const indiaMarkers = L.layerGroup().addTo(map);
      const stateMarkers = L.layerGroup();
      const cityMarkers = L.layerGroup();

      // Update refs
      mapInstanceRef.current = map;
      mapRefsRef.current = {
        map,
        indiaGeoJsonLayer: null,
        stateGeoJsonLayer: null,
        indiaMarkers,
        stateMarkers,
        cityMarkers,
        currentStateLayer: null,
        stateLayers: [],
      };

      // Force map resize
      setTimeout(() => {
        map.invalidateSize(true);
      }, 100);

      // Load GeoJSON data and setup keyboard navigation
      await loadGeoJSONData(map, mapData, pincodeData);
      setupKeyboardNavigation();
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [
    getMapDataQuery,
    getPincodeDataQuery,
    setMapData,
    setPincodeData,
    loadGeoJSONData,
    setupKeyboardNavigation,
  ]);

  useEffect(() => {
    initializeMap();

    return () => {
      if (keyboardListenerRef.current) {
        window.removeEventListener('keydown', keyboardListenerRef.current);
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (backTos.country) {
      backToIndia();
      backToDefaultValues();
    }
    if (backTos.state) {
      backToState();
      backToDefaultValues();
    }
  }, [backTos, backToIndia, backToState, backToDefaultValues]);

  return (
    <div className="bg-background-dark-500 h-screen overflow-hidden">
      <div ref={mapRef} className="!h-full !w-full" />
    </div>
  );
};

export default MapSection;
