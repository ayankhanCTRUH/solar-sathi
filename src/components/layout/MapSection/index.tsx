'use client';
import { useEffect, useRef, useState } from 'react';
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
import { useMapState } from '@/lib/store';

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  const getMapDataQuery = useGetMapData({ enabled: false });

  const [currentStateNameState, setCurrentStateNameState] = useState<
    string | null
  >(null);

  let currentStateName: string | null = null;

  const getStateGeoJSONDataQuery = useGetGeoJSONData({
    enabled: false,
    fileName: currentStateNameState,
  });

  const getIndiaGeoJSONDataQuery = useGetGeoJSONData({
    enabled: false,
    fileName: 'india',
  });

  const getPincodeDataQuery = useGetPincodeData({ enabled: false });
  const { mapData, setMapData, pincodeData, setPincodeData } = useMapState();

  let map: L.Map;

  let indiaGeoJsonLayer: L.GeoJSON;
  let stateGeoJsonLayer: L.GeoJSON;

  let indiaMarkers: L.LayerGroup;
  let stateMarkers: L.LayerGroup;
  let cityMarkers: L.LayerGroup;

  let currentStateLayer: L.GeoJSON | null = null;

  const stateLayers: Array<L.Layer> = [];

  const {
    focusWeight,
    focusColor,
    focusFillColor,
    focusFillOpacity,
    fillColor,
    weight,
    opacity,
    color,
    fillOpacity,
  } = MAP_STYLE_DATA;

  function backToState() {
    map.fitBounds(stateGeoJsonLayer.getBounds());
    map.removeLayer(stateGeoJsonLayer);

    map.removeLayer(cityMarkers);
    stateMarkers.addTo(map);

    cityMarkers.clearLayers();

    if (currentStateLayer) {
      focusLayer(currentStateLayer);
    }
  }

  function backToIndia() {
    map.fitBounds(indiaGeoJsonLayer.getBounds());

    map.removeLayer(stateGeoJsonLayer);

    map.removeLayer(cityMarkers);
    stateMarkers.addTo(map);

    cityMarkers.clearLayers();

    map.removeLayer(stateMarkers);
    stateMarkers.clearLayers();

    indiaMarkers.addTo(map);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    indiaGeoJsonLayer.getLayers().forEach((layer: any) => {
      if (STATE_NAME_DATA.includes(layer.feature.properties.ST_NM)) {
        focusLayer(layer);
      }
    });
  }

  function unfocusMap(layers: Array<L.Layer>) {
    layers.forEach((layer) => {
      indiaGeoJsonLayer.resetStyle(layer);
    });
  }

  function focusLayer(layer: L.GeoJSON) {
    layer.setStyle({
      weight: focusWeight,
      color: focusColor,
      fillColor: focusFillColor,
      fillOpacity: focusFillOpacity,
    });
    layer.bringToFront();
  }

  function createIndiaMarkers(
    stateName: string,
    houseCount: number,
    latLng: [number, number],
    layer: L.GeoJSON
  ) {
    const markerIcon = L.divIcon({
      className: 'text-center',
      html: `
        <div class="flex flex-col items-center">
          <div class="relative top-3.5 text-lg font-dm-sans font-bold text-white">${houseCount.toLocaleString()}</div>
          <div class="mb-2.5">
            <img class="marker" src="/icons/marker.svg" alt="Icon" />
          </div>
          <div class=
          "relative -top-3.5 w-auto rounded-[20px] bg-white p-1 text-xs font-normal font-dm-sans text-black">${stateName}</div>
        </div>
      `,
      iconSize: [60, 80],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const marker: any = L.marker(latLng, { icon: markerIcon });
    marker.name = stateName;
    const bounds = layer.getBounds();
    marker.on('click', () => {
      map.fitBounds(bounds);
      unfocusMap(stateLayers);
      focusLayer(layer);
      currentStateLayer = layer;
      setCurrentStateNameState(stateName);
      currentStateName = stateName;
      addStateMarkers(marker.name);
      map.removeLayer(indiaMarkers);
    });

    return marker;
  }

  function createStateMarkers(
    cityName: string,
    houseCount: number,
    pincode: string
  ) {
    const markerIcon = L.divIcon({
      className: 'text-center',
      html: `
        <div class="flex flex-col items-center">
          <div class="relative top-3.5 text-lg font-bold text-white">${houseCount.toLocaleString()}</div>
          <div class="mb-2.5">
            <img class="marker" src="/icons/marker.svg" alt="Icon" />
          </div>
          <div class="relative -top-3.5 w-auto rounded-[20px] bg-white p-1 text-xs font-normal text-black">${cityName}</div>
        </div>
      `,
      iconSize: [60, 80],
    });

    const latLng = getCoordinatesByPincode(parseInt(pincode), pincodeData);
    if (!latLng) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const marker: any = L.marker(latLng, { icon: markerIcon });
    marker.name = cityName;

    marker.on('click', () => {
      if (!currentStateLayer) return;
      map.removeLayer(stateMarkers);
      unfocusMap([currentStateLayer]);

      addCityMarkers(cityName);
      loadStateGeoJSONData(cityName);
    });

    return marker;
  }

  function createCityMarkers(pincode: number) {
    const markerIcon = L.divIcon({
      className: 'text-center',
      html: `
        <div class="flex flex-col items-center">
          <div class="mb-2.5">
            <img class="marker" src="/icons/marker.svg" alt="Icon" />
          </div>
          <div class="relative -top-3.5 w-auto rounded-[20px] bg-white p-1 text-xs font-normal text-black">${pincode}</div>
        </div>
      `,
      iconSize: [60, 80],
    });

    const latLng = getCoordinatesByPincode(pincode, pincodeData);
    if (!latLng) {
      console.log("can't find the coordinates of the pincode");
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const marker: any = L.marker(latLng, { icon: markerIcon });
    marker.name = pincode;

    return marker;
  }

  function addCityMarkers(cityName: string) {
    cityMarkers.addTo(map);

    if (currentStateName) {
      const cityData = getPincodesByCity(currentStateName, cityName, mapData);
      cityData?.forEach((pincode) => {
        const marker = createCityMarkers(parseInt(pincode));
        if (marker) marker.addTo(cityMarkers);
      });
    }
  }

  function addStateMarkers(stateName: string) {
    stateMarkers.addTo(map);

    const stateData = getCitiesByState(stateName, mapData);
    if (!stateData) return;
    stateData.forEach((data) => {
      const marker = createStateMarkers(
        data.cityName,
        data.count,
        data.pincode
      );
      if (marker) marker.addTo(stateMarkers);
    });
  }

  const loadStateGeoJSONData = async (cityName: string) => {
    const { data } = await getStateGeoJSONDataQuery.refetch();

    const styleFeature = () => ({
      fillColor: fillColor,
      weight: weight,
      opacity: opacity,
      color: color,
      fillOpacity: fillOpacity,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onEachFeature = (feature: any, layer: L.GeoJSON) => {
      const distName = feature.properties.district;

      if (cityName === distName) {
        layer.setStyle({
          weight: focusWeight,
          color: focusColor,
          fillColor: focusFillColor,
          fillOpacity: focusFillOpacity,
          pane: 'highlightPane',
        });
        layer.bringToFront();

        console.log('city name', cityName, ' ', layer, '', layer.getBounds());
        map.fitBounds(layer.getBounds());
      }
    };

    stateGeoJsonLayer = L.geoJSON(data, {
      style: styleFeature,
      onEachFeature: onEachFeature,
    }).addTo(map);

    map.fitBounds(stateGeoJsonLayer.getBounds());
  };

  const loadGeoJSONData = async (map: L.Map) => {
    const { data } = await getIndiaGeoJSONDataQuery.refetch();

    const styleFeature = () => ({
      fillColor: fillColor,
      weight: weight,
      opacity: opacity,
      color: color,
      fillOpacity: fillOpacity,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onEachFeature = (feature: any, layer: L.GeoJSON) => {
      const stateName = feature.properties.ST_NM;

      if (STATE_NAME_DATA.includes(stateName)) {
        const houseCount = getStateCount(stateName, mapData);
        const latLng = STATE_DATA[stateName].latLng;

        if (!houseCount) return;

        layer.setStyle({
          weight: focusWeight,
          color: focusColor,
          fillColor: focusFillColor,
          fillOpacity: focusFillOpacity,
          // pane: 'highlightPane',
        });

        if (map) {
          const marker = createIndiaMarkers(
            stateName,
            houseCount,
            latLng,
            layer
          );
          marker.addTo(indiaMarkers);
        }

        stateLayers.push(layer);
      }
    };

    indiaGeoJsonLayer = L.geoJSON(data, {
      style: styleFeature,
      onEachFeature: onEachFeature,
    }).addTo(map);

    map.fitBounds(indiaGeoJsonLayer.getBounds());

    // Temp remove later

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', (e) => {
        if (e.key == 'l') backToState();
        else if (e.key == 'k') backToIndia();
      });
    }
  };

  useEffect(() => {
    const initializeMap = async () => {
      try {
        if (!mapRef.current) return;

        const getMapDataResponse = await getMapDataQuery.refetch();
        setMapData(getMapDataResponse?.data?.states_cities_counts);

        const getPincodeDataResponse = await getPincodeDataQuery.refetch();
        setPincodeData(getPincodeDataResponse?.data);

        // eslint-disable-next-line react-hooks/exhaustive-deps
        map = L.map(mapRef.current, {
          zoomControl: false,
          attributionControl: false,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          dragging: true,
          preferCanvas: true,
        }).setView([20.5937, 78.9629], 5);

        mapInstanceRef.current = map;

        map.createPane('highlightPane');
        map.getPane('highlightPane')!.style.zIndex = '550';

        // eslint-disable-next-line react-hooks/exhaustive-deps
        indiaMarkers = L.layerGroup().addTo(map);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        stateMarkers = L.layerGroup().addTo(map);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        cityMarkers = L.layerGroup().addTo(map);

        setTimeout(() => {
          if (map) {
            map.invalidateSize(true);
          }
        }, 100);

        await loadGeoJSONData(map);
      } catch (err) {
        console.error('Error initializing map: ', err);
      }
    };

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-background-dark-500 h-screen overflow-hidden">
      <div ref={mapRef} className="!h-full !w-full"></div>
    </div>
  );
};

export default MapSection;
