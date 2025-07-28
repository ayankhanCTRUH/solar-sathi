import { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './mapTemp/mapStyles.css';

import { mapStylingParams } from '@/data/constants';
import {
  stateData,
  states,
  maharashtraData,
  cityDataMap,
} from './mapTemp/data';
import {
  getCoordinatesByPincode,
  loadPincodeData,
} from '@/lib/utils/pincodeLookUp';
import {
  fetchMapData,
  getCitiesByState,
  getPincodesByCity,
  getStateCount,
} from '@/lib/utils/mapData';

type StateData = {
  cityName: string;
  count: number;
  pincode: string;
};

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  let map: L.Map;

  let indiaGeoJsonLayer: L.GeoJSON;
  let stateGeoJsonLayer: L.GeoJSON;

  let indiaMarkers: L.LayerGroup;
  let stateMarkers: L.LayerGroup;
  let cityMarkers: L.LayerGroup;

  let currentStateLayer: L.GeoJSON | null = null;
  let currentStateName: string | null = null;

  let currentCityLayer: L.Layer | null = null;

  const stateLayers: Array<L.Layer> = [];

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

  function backToInda() {
    map.fitBounds(indiaGeoJsonLayer.getBounds());

    map.removeLayer(stateGeoJsonLayer);

    map.removeLayer(cityMarkers);
    stateMarkers.addTo(map);

    cityMarkers.clearLayers();

    map.removeLayer(stateMarkers);
    stateMarkers.clearLayers();

    indiaMarkers.addTo(map);

    indiaGeoJsonLayer.getLayers().forEach((layer: any) => {
      if (states.includes(layer.feature.properties.ST_NM)) {
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
      weight: mapStylingParams.focusWeight,
      color: mapStylingParams.focusColor,
      fillColor: mapStylingParams.focusFillColor,
      fillOpacity: mapStylingParams.focusFillOpacity,
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
      className: 'map-marker',
      html: `
        <div class="marker-content">
          <div class="value">${houseCount.toLocaleString()}</div>
          <div class="icon">
            <img class="marker" src="/marker.svg" alt="Icon" />
          </div>
          <div class="state-name">${stateName}</div>
        </div>
      `,
      iconSize: [60, 80],
    });

    const marker: any = L.marker(latLng, { icon: markerIcon });
    marker.name = stateName;
    const bounds = layer.getBounds();
    marker.on('click', () => {
      map.fitBounds(bounds);
      unfocusMap(stateLayers);
      focusLayer(layer);
      currentStateLayer = layer;
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
      className: 'map-marker',
      html: `
        <div class="marker-content">
          <div class="value">${houseCount.toLocaleString()}</div>
          <div class="icon">
            <img class="marker" src="/marker.svg" alt="Icon" />
          </div>
          <div class="state-name">${cityName}</div>
        </div>
      `,
      iconSize: [60, 80],
    });

    const latLng = getCoordinatesByPincode(parseInt(pincode));
    if (!latLng) return;

    const marker: any = L.marker(latLng, { icon: markerIcon });
    marker.name = cityName;

    marker.on('click', () => {
      if (!currentStateLayer) return;
      map.removeLayer(stateMarkers);
      unfocusMap([currentStateLayer]);
      loadStateGeoJSONData(cityName);
      addCityMarkers(cityName);
    });

    return marker;
  }

  function createCityMarkers(pincode: number) {
    const markerIcon = L.divIcon({
      className: 'map-marker',
      html: `
        <div class="marker-content">
          <div class="icon">
            <img class="marker" src="/marker.svg" alt="Icon" />
          </div>
          <div class="state-name">${pincode}</div>
        </div>
      `,
      iconSize: [60, 80],
    });

    const latLng = getCoordinatesByPincode(pincode);
    if (!latLng) {
      console.log("can't find the coordintes of the pincode");
      return;
    }

    const marker: any = L.marker(latLng, { icon: markerIcon });
    marker.name = pincode;

    return marker;
  }

  function addCityMarkers(cityName: string) {
    cityMarkers.addTo(map);

    if (currentStateName) {
      const cityData = getPincodesByCity(currentStateName, cityName);
      cityData?.forEach((pincode) => {
        const marker = createCityMarkers(parseInt(pincode));
        if (marker) marker.addTo(cityMarkers);
      });
    }
  }

  function addStateMarkers(stateName: string) {
    stateMarkers.addTo(map);

    const stateData: StateData[] | null = getCitiesByState(stateName);
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
    try {
      const response = await fetch(
        `/mapData/geoJson/${currentStateName}.geojson`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIsLoading(false);

      const styleFeature = () => ({
        fillColor: mapStylingParams.fillColor,
        weight: mapStylingParams.weight,
        opacity: mapStylingParams.opacity,
        color: mapStylingParams.color,
        fillOpacity: mapStylingParams.fillOpacity,
      });

      const onEachFeature = (feature: any, layer: L.GeoJSON) => {
        const distName = feature.properties.district;

        if (cityName === distName) {
          layer.setStyle({
            weight: mapStylingParams.focusWeight,
            color: mapStylingParams.focusColor,
            fillColor: mapStylingParams.focusFillColor,
            fillOpacity: mapStylingParams.focusFillOpacity,
            pane: 'highlightPane',
          });
          layer.bringToFront();

          console.log('city name', cityName, ' ', layer.getBounds());
          map.fitBounds(layer.getBounds());
        }
      };

      //   console.log(data);

      stateGeoJsonLayer = L.geoJSON(data, {
        style: styleFeature,
        onEachFeature: onEachFeature,
      }).addTo(map);

      map.fitBounds(stateGeoJsonLayer.getBounds());
    } catch (err) {
      console.log(err);
    }
  };

  const loadGeoJSONData = async (map: L.Map) => {
    try {
      const response = await fetch('/mapData/geoJson/india.geojson');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIsLoading(false);

      const styleFeature = () => ({
        fillColor: mapStylingParams.fillColor,
        weight: mapStylingParams.weight,
        opacity: mapStylingParams.opacity,
        color: mapStylingParams.color,
        fillOpacity: mapStylingParams.fillOpacity,
      });

      const onEachFeature = (feature: any, layer: L.GeoJSON) => {
        const stateName = feature.properties.ST_NM;

        if (states.includes(stateName)) {
          const houseCount = getStateCount(stateName);
          const latLng = stateData[stateName].latLng;

          if (!houseCount) return;

          layer.setStyle({
            weight: mapStylingParams.focusWeight,
            color: mapStylingParams.focusColor,
            fillColor: mapStylingParams.focusFillColor,
            fillOpacity: mapStylingParams.focusFillOpacity,
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
    } catch (err) {
      console.log(err);
    }

    // Temp remove later

    window.addEventListener('keydown', (e) => {
      if (e.key == 'l') {
        backToState();
      } else if (e.key == 'k') {
        backToInda();
      }
    });
  };

  useEffect(() => {
    const initializeMap = async () => {
      try {
        if (!mapRef.current) return;

        await fetchMapData();
        await loadPincodeData();

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

        indiaMarkers = L.layerGroup().addTo(map);
        stateMarkers = L.layerGroup().addTo(map);
        cityMarkers = L.layerGroup().addTo(map);

        setTimeout(() => {
          if (map) {
            map.invalidateSize(true);
          }
        }, 100);

        await loadGeoJSONData(map);
      } catch (err) {
        console.error('Error initializing map: ', err);
        setError(
          'Could not initialize map. Pease refresh the page to try again'
        );
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
    <>
      <div className="map-container">
        <div ref={mapRef} id="map"></div>
      </div>
    </>
  );
};

export default MapComponent;
