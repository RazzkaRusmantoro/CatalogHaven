import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './MapComponent.css';


const MapComponent = () => {
  const mapContainerRef = useRef(null); // Create a ref to hold the map container
  const mapRef = useRef(null); // Store the map instance
  const [address, setAddress] = useState(''); // State to store the address
  const [locationError, setLocationError] = useState(null); // State for geolocation error

  useEffect(() => {

    mapboxgl.accessToken = 'pk.eyJ1IjoicmF6emthcnVzbWFudG9ybyIsImEiOiJjbTVpY2Rpangwbm92MmpzZnM0eHJhdXRvIn0.7hf8EyRdx8v6xixuqUjbIw';


    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;


            initializeMap(latitude, longitude);
          },
          (error) => {
            setLocationError('Geolocation error: ' + error.message); 
            initializeMap(40, -74.5); 
          }
        );
      } else {
        setLocationError('Geolocation is not supported by this browser.');
        initializeMap(40, -74.5);
      }
    };

    const initializeMap = (latitude, longitude) => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 15,
        attributionControl: false,
      });

      mapRef.current = map; 

      const getAddressFromCenter = async () => {
        const center = map.getCenter();
        const { lng, lat } = center;

        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`);
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          setAddress(data.features[0].place_name);
        } else {
          setAddress('No address found');
        }
      };


      getAddressFromCenter();

      map.on('moveend', getAddressFromCenter);

      const resizeMap = () => {
        if (mapRef.current) {
          mapRef.current.resize();
        }
      };

      window.addEventListener('resize', resizeMap);

      return () => {
        map.remove();
        window.removeEventListener('resize', resizeMap); 
      };
    };

    getCurrentLocation();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', height: '80vh' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

      {/* Button */}
      <div>
      </div>

      {/* SVG centered in the middle */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 100 100">
          <path d="M52,96c-1.736,0-3.368-0.676-4.596-1.904c-3.139-3.14-30.659-31.284-30.627-52.478	C16.807,21.509,35.014,8,52,8c16.984,0,35.191,13.509,35.224,33.618c0.033,21.241-27.492,49.347-30.63,52.481	C55.362,95.326,53.732,96,52,96z" opacity=".35"></path>
          <path fill="#f2f2f2" d="M50,94c-1.736,0-3.368-0.676-4.596-1.904c-3.139-3.14-30.659-31.284-30.627-52.478	C14.807,19.509,33.014,6,50,6c16.984,0,35.191,13.509,35.224,33.618c0.033,21.241-27.492,49.347-30.63,52.481	C53.362,93.326,51.732,94,50,94z"></path>
          <path fill="#f4665c" stroke="#40396e" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M50,12.5c-14.043,0-28.699,11.151-28.723,27.128C21.248,58.746,50,87.5,50,87.5s28.754-28.714,28.723-47.872	C78.698,23.675,64.043,12.5,50,12.5z"></path>
          <circle cx="50" cy="40.147" r="13.147" fill="#f2f2f2"></circle>
        </svg>
      </div>

      {/* Address container */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          padding: '10px',
          borderRadius: '5px',
          zIndex: 10,
        }}
      className = "address">
        {locationError ? (
          <p>{locationError}</p>
        ) : (
          <h5></h5>
        )}
        <h4>{address}</h4> {/* Display the address */}
      </div>
    </div>
  );
};

export default MapComponent;
