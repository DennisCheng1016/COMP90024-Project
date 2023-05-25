import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { MapContainer, MapStyles, SpinContainer } from './customizedMapStyle';
import _ from 'lodash';

// @ts-ignore
import geoVIC from '../../../../assets/geoVIC.geojson';

import { useRequest } from 'ahooks';
import { InfoWindow } from './components';
import { ButtonContainer, ButtonContainer2, ButtonContainer3 } from '../../../../AppStyle';
import { Button, LoadingOverlay } from '@mantine/core';
import { drawColor, getData } from './utils';

const CustomizedMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDRr0yCCMfGq6aXVKM0LEYEte1wmtfkjkI',
  });
  const [currentDatabase, setCurrentDatabase] = useState('SUDO');
  const [currentCase, setCurrentCase] = useState('GAMBLING');
  const [map, setMap] = useState<google.maps.Map>();
  const [windowName, setWindowName] = useState<any>();
  const [windowCoordinate, setWindowCoordinate] = useState<any>();

  const {
    data: requestData,
    loading,
    run,
  } = useRequest(getData, {
    manual: true,
  }) as { data: any; loading: boolean; run: any };

  useEffect(() => {
    setWindowCoordinate(0);
    setWindowName('');
    let endpoint = '';
    if (currentDatabase === 'SUDO') {
      endpoint += 'sudo/';
    } else if (currentDatabase === 'TWITTER') {
      endpoint += 'tweet/';
    } else if (currentDatabase === 'INTEGRATION') {
      endpoint += 'integration/';
    }

    if (currentCase === 'LIQUOR') {
      endpoint += 'liquor/';
    } else if (currentCase === 'GAMBLING') {
      endpoint += 'gambling/';
    } else if (currentCase === 'FOOD') {
      endpoint += 'food/';
    }

    endpoint += 'analysis';
    run(endpoint);
  }, [currentDatabase, currentCase]);

  const drawZones = (map: google.maps.Map) => {
    map.data.loadGeoJson(geoVIC);
    map.data.setStyle({
      strokeWeight: 1,
      strokeColor: 'red',
      strokeOpacity: 1,
      fillColor: '#146474',
    });
    map.data.addListener('mouseover', (event: any) => {
      map.data.overrideStyle(event.feature, { strokeColor: '#e8812e', strokeWeight: 6 });
    });
    map.data.addListener('mouseout', (event: any) => {
      map.data.revertStyle();
    });
    map.data.addListener('click', (event: any) => {
      const localityName = _.values(
        _.pickBy(event.feature.h, (value, key) => {
          return _.endsWith(key, '_3');
        })
      )[0];
      const coordinate = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      setWindowCoordinate(coordinate);
      setWindowName(localityName);
    });
  };

  useEffect(() => {
    if (map) drawZones(map);
    if (map && requestData) drawColor(map, requestData);
  }, [requestData, map]);

  if (!isLoaded || loading)
    return (
      <SpinContainer>
        <LoadingOverlay visible={true} loaderProps={{ size: 'lg', color: 'pink' }} />
      </SpinContainer>
    );

  return (
    <MapContainer>
      {!isLoaded || loading}
      <ButtonContainer>
        <Button
          variant={currentDatabase === 'SUDO' ? 'white' : 'gradient'}
          gradient={{ from: 'indigo', to: 'cyan' }}
          size="lg"
          onClick={() => setCurrentDatabase('SUDO')}
        >
          SUDO
        </Button>
        <Button
          variant={currentDatabase === 'TWITTER' ? 'white' : 'gradient'}
          gradient={{ from: 'indigo', to: 'cyan' }}
          size="lg"
          onClick={() => setCurrentDatabase('TWITTER')}
        >
          TWITTER
        </Button>
        <Button
          variant={currentDatabase === 'INTEGRATION' ? 'white' : 'gradient'}
          gradient={{ from: 'indigo', to: 'cyan' }}
          size="lg"
          onClick={() => {
            setCurrentDatabase('INTEGRATION');
            if (currentCase === 'FOOD') {
              setCurrentCase('GAMBLING');
            }
          }}
        >
          INTEGRATION
        </Button>
      </ButtonContainer>
      <ButtonContainer2>
        <Button
          radius="lg"
          size="xs"
          variant={currentCase === 'GAMBLING' ? 'white' : 'gradient'}
          gradient={{ from: 'indigo', to: 'cyan' }}
          onClick={() => setCurrentCase('GAMBLING')}
        >
          GAMBLING
        </Button>
        <Button
          radius="lg"
          size="xs"
          variant={currentCase === 'LIQUOR' ? 'white' : 'gradient'}
          gradient={{ from: 'indigo', to: 'cyan' }}
          onClick={() => setCurrentCase('LIQUOR')}
        >
          LIQUOR
        </Button>
        <Button
          radius="lg"
          size="xs"
          variant={currentCase === 'FOOD' ? 'white' : 'gradient'}
          gradient={{ from: 'indigo', to: 'cyan' }}
          onClick={() => setCurrentCase('FOOD')}
          disabled={currentDatabase === 'INTEGRATION'}
        >
          FOOD & Obesity
        </Button>
      </ButtonContainer2>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '100%',
        }}
        onLoad={(map: any) => {
          setMap(map);

          drawZones(map);
          map.setCenter({ lat: -37.81, lng: 144.9 });
        }}
        zoom={7}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
          disableDoubleClickZoom: true,
          rotateControl: false,
          panControl: false,
          scaleControl: false,
          styles: MapStyles,
          minZoom: 3,
        }}
      >
        {windowCoordinate && windowName && (
          <InfoWindow
            windowCoordinate={windowCoordinate}
            windowName={windowName}
            setWindowCoordinate={setWindowCoordinate}
            setWindowName={setWindowName}
            currentCase={currentCase}
            currentDatabase={currentDatabase}
          />
        )}
        <ButtonContainer3>
          <Button
            variant="gradient"
            gradient={{ from: 'orange', to: 'red' }}
            onClick={() => {
              window.location.href = 'http://115.146.94.76:8050';
            }}
          >
            To Mastodon
          </Button>
        </ButtonContainer3>
      </GoogleMap>
    </MapContainer>
  );
};

export default CustomizedMap;
