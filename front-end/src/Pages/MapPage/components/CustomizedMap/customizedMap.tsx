import React, { useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { MapContainer, MapStyles } from './customizedMapStyle';
import {useMount} from "ahooks";


const CustomizedMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDRr0yCCMfGq6aXVKM0LEYEte1wmtfkjkI',
    libraries: ['places'],
  });


  const drawZones = (map: google.maps.Map) => {
    map.data.loadGeoJson("https://data.gov.au/geoserver/vic-local-government-areas-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_bdf92691_c6fe_42b9_a0e2_a4cd716fa811&outputFormat=json")
    map.data.setStyle({
      strokeWeight: 1,
      strokeColor: 'black',
      strokeOpacity: 1,
      fillColor: "#146474",
    });
    map.data.addListener('mouseover', (event: any) => {
      map.data.overrideStyle(event.feature, {fillColor: 'red'})
    })
    map.data.addListener('mouseout', (event: any) => {
      map.data.revertStyle()
    })
  }

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <MapContainer>
      <GoogleMap
        center={{ lat: -37.81, lng: 144.9 }}
        mapContainerStyle={{
          width: '100%',
          height: '100%',
        }}
        onLoad={map => drawZones(map)}
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
