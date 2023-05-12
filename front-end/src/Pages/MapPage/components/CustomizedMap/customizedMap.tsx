import React from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { MapContainer, MapStyles } from './customizedMapStyle';
// @ts-ignore
import geoVIC from '../../../../assets/geoVIC.geojson'
// @ts-ignore
import geoMel from '../../../../assets/geoMel.geojson'


const CustomizedMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDRr0yCCMfGq6aXVKM0LEYEte1wmtfkjkI',
    libraries: ['places'],
  });


  const drawZones = (map: google.maps.Map) => {
    map.data.loadGeoJson(geoVIC)
    // map.data.loadGeoJson(geoMel)
    map.data.setStyle({
      strokeWeight: 1,
      strokeColor: 'red',
      // '#0c4ef8'
      strokeOpacity: 1,
      fillColor: "#146474",
    });
    map.data.addListener('mouseover', (event: any) => {
      map.data.overrideStyle(event.feature, {fillColor: 'red'})
    })
    map.data.addListener('mouseout', (event: any) => {
      map.data.revertStyle()
    })

    // @ts-ignore
    map.data.setStyle(feature => {
      console.log(feature.getProperty('vic_lga__3'))})
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
