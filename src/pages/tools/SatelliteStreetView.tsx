import React, { useState, useCallback } from 'react';
import { GoogleMap, StreetViewPanorama, LoadScript } from '@react-google-maps/api';
import ToolLayout from '../../components/ToolLayout';
import { Globe } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const SatelliteStreetView = () => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState('');

  const API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your Google Maps API key

  const handleSearch = () => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if (isNaN(latitude) || isNaN(longitude)) {
      setError('Please enter valid latitude and longitude');
      return;
    }

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      setError('Coordinates out of range (Lat: -90 to 90, Lng: -180 to 180)');
      return;
    }

    setError('');
    setMapCenter({ lat: latitude, lng: longitude });
  };

  const onLoadMap = useCallback((map) => {
    // Map loaded, no additional setup needed here
  }, []);

  const onLoadStreetView = useCallback((panorama) => {
    // Ensure Street View is centered on the coordinates
    panorama.setPosition(mapCenter);
  }, [mapCenter]);

  return (
     <ToolLayout
      title="Satellite Street View"
      description="Find street-level satellite views based on location coordinates."
      icon={<Globe className="h-8 w-8 text-blue-500" />}
    >
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-lg font-bold">Satellite Street View</h2>
      <p className="text-sm mb-4">Find street-level satellite views based on location coordinates.</p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value.trim())}
          placeholder="Latitude (e.g., 37.7749)"
          className="border p-2 flex-1 rounded"
        />
        <input
          type="text"
          value={lng}
          onChange={(e) => setLng(e.target.value.trim())}
          placeholder="Longitude (e.g., -122.4194)"
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <LoadScript googleMapsApiKey={API_KEY}>
        {mapCenter.lat !== 0 && mapCenter.lng !== 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Satellite Map */}
            <div>
              <h3 className="font-semibold mb-2">Satellite View</h3>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={15}
                onLoad={onLoadMap}
                mapTypeId="satellite"
              />
            </div>

            {/* Street View */}
            <div>
              <h3 className="font-semibold mb-2">Street View</h3>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={15}
              >
                <StreetViewPanorama
                  position={mapCenter}
                  visible={true}
                  onLoad={onLoadStreetView}
                  options={{
                    enableCloseButton: false,
                    addressControl: false,
                  }}
                />
              </GoogleMap>
            </div>
          </div>
        )}
      </LoadScript>
    </div>
          </ToolLayout>
  );
};

export default SatelliteStreetView;