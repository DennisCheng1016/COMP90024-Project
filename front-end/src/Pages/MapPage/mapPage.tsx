import React from 'react';
import { CustomizedMap } from './components';
import { MapPageContainer } from './mapPageStyle';

const MapPage = () => {
  return (
    <MapPageContainer>
      <CustomizedMap />
    </MapPageContainer>
  );
};

export default MapPage;
