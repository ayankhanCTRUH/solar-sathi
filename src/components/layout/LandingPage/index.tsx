'use client';
import { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_STYLE_DATA, STATE_DATA, STATE_NAME_DATA } from '@/data/constants';
import { useGetGeoJSONData } from '@/services/map-service';
import { LayerData } from '@/types';

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

const LandingPageMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map>(null);

  const getIndiaGeoJSONDataQuery = useGetGeoJSONData({
    enabled: false,
    fileName: 'india',
  });

  let map: L.Map;

  function focusLayer(layer: L.GeoJSON) {
    layer.setStyle({
      weight: focusWeight,
      color: focusColor,
      fillColor: focusFillColor,
      fillOpacity: focusFillOpacity,
    });
    layer.bringToFront();
  }

  function createIndiaMarkers(latLng: [number, number]) {
    const markerIcon = L.divIcon({
      className: 'text-center',
      html: `
      <div class="circle-animation absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[26px] h-[26px] bg-secondary-500 text-white text-center leading-[100px] font-sans rounded-full text-xl cursor-pointer">

</div>
          `,
      //   iconSize: [60, 80],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const marker: any = L.marker(latLng, { icon: markerIcon });
    return marker;
  }

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
    const onEachFeature = (feature: any) => {
      const stateName = feature.properties.ST_NM;

      if (STATE_NAME_DATA.includes(stateName)) {
        const latLng = STATE_DATA[stateName].latLng;

        if (map) {
          const marker = createIndiaMarkers(latLng);
          marker.addTo(map);
        }
      }
    };

    const indiaGeoJsonLayer = L.geoJSON(data, {
      style: styleFeature,
      onEachFeature: onEachFeature,
    }).addTo(map);

    indiaGeoJsonLayer.getLayers().forEach((layer) => {
      if (
        layer instanceof L.GeoJSON &&
        (layer as LayerData).feature?.properties?.ST_NM &&
        STATE_NAME_DATA.includes((layer as LayerData).feature.properties.ST_NM)
      ) {
        focusLayer(layer);
      }
    });

    map.setMaxBounds(indiaGeoJsonLayer.getBounds());
    map.fitBounds(indiaGeoJsonLayer.getBounds());
  };

  useEffect(() => {
    const initializeMap = async () => {
      try {
        if (!mapRef.current) return;

        // eslint-disable-next-line react-hooks/exhaustive-deps
        map = L.map(mapRef.current, {
          zoomControl: false,
          attributionControl: false,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          dragging: false,
          preferCanvas: true,
          maxBoundsViscosity: 1.0,
        }).setView([20.5937, 78.9629], 5);

        mapInstanceRef.current = map;

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

      {/* Inline CSS for Pulse Animation */}
      <style>
        {`
          @keyframes pulseAnimation {
            100% {
                transform: scale(2);
                opacity: 0;
            }
            }
        `}
      </style>
    </div>
  );
};

export default LandingPageMap;
