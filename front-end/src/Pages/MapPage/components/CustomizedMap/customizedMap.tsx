import React, {useState} from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { MapContainer, MapStyles } from './customizedMapStyle';

const CustomizedMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDyK9uw6HV-NutQ691Dd1Fz5yk8INzDkC8',
    libraries: ['places'],
  });



  if (!isLoaded) return <div>Loading...</div>;

  return (
    <MapContainer>
      <GoogleMap
        center={{ lat: -37.81, lng: 144.9 }}
        mapContainerStyle={{
          width: '100%',
          height: '100%',
        }}
        zoom={10}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
          rotateControl: false,
          panControl: false,
          scaleControl: false,
          styles: MapStyles,
          minZoom: 3,
        }}
      ></GoogleMap>
    </MapContainer>
  );
};

export default CustomizedMap;
