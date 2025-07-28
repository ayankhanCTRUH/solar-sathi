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

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  let map: L.Map;
  let stateGeoJsonLayer: L.GeoJSON;

  let indiaMarkers: L.LayerGroup;
  let stateMarkers: L.LayerGroup;
  let cityMarkers: L.LayerGroup;

  let currentStateLayer: L.Layer | null = null;
  let currentStateName: string | null = null;

  const stateLayers: Array<L.Layer> = [];

  function unfocusMap(layers: Array<L.Layer>) {
    layers.forEach((layer) => {
      stateGeoJsonLayer.resetStyle(layer);
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
    latLng: [number, number]
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

  function createCityMarkers(pincode: number, latLng: [number, number]) {
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

    // const latLng = getCoordinatesByPincode(pincode);
    if (!latLng) return;

    const marker: any = L.marker(latLng, { icon: markerIcon });
    marker.name = pincode;

    return marker;
  }

  function addCityMarkers(cityName: string) {
    console.log(cityName);
    if (cityName == 'Nagpur' || cityName == 'Pune') {
      const data = cityDataMap[cityName];
      Object.entries(data).forEach(([pincode, latLng]) => {
        const marker = createCityMarkers(parseInt(pincode), latLng);
        marker.addTo(cityMarkers);
      });
    }
  }

  function addStateMarkers(stateName: string) {
    if (stateName == 'Maharashtra') {
      Object.entries(maharashtraData).forEach(
        ([cityName, { value, latLng }]) => {
          createStateMarkers(cityName, value, latLng).addTo(stateMarkers);
        }
      );
    }
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
          const houseCount = stateData[stateName].value;
          const latLng = stateData[stateName].latLng;

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

      stateGeoJsonLayer = L.geoJSON(data, {
        style: styleFeature,
        onEachFeature: onEachFeature,
      }).addTo(map);

      map.fitBounds(stateGeoJsonLayer.getBounds());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const initializeMap = async () => {
      try {
        if (!mapRef.current) return;

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
