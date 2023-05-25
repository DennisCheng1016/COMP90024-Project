import React, { useEffect } from 'react';
import { InfoBox } from '@react-google-maps/api';
import {
  CloseButtonContainer,
  Content,
  InfoWindowContainer,
  Title,
} from './infoWindowStyle';
import { CloseButton, LoadingOverlay } from '@mantine/core';
import { useRequest } from 'ahooks';
import { getData } from '../../utils';
import { renderLayer } from './utils';

const InfoWindow = ({
  windowCoordinate,
  windowName,
  setWindowCoordinate,
  setWindowName,
  currentCase,
  currentDatabase,
}) => {
  const stopPropagation = {
    onClick: (event) => event.stopPropagation(),
    onDoubleClick: (event) => event.stopPropagation(),
    onWheel: (event) => event.stopPropagation(),
    onDrag: (event) => event.stopPropagation(),
  };

  const {
    data: requestData,
    loading,
    run,
  } = useRequest(getData, {
    manual: true,
  });

  useEffect(() => {
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
    endpoint += 'data/';

    endpoint += windowName;
    run(endpoint);
  }, [windowName]);

  return (
    <InfoBox
      position={windowCoordinate}
      options={{
        closeBoxURL: ``,
        pixelOffset: new window.google.maps.Size(-250, 20),
      }}
    >
      <InfoWindowContainer {...stopPropagation}>
        {loading ? (
          <LoadingOverlay visible={true} loaderProps={{ size: 'lg', color: 'pink' }} />
        ) : (
          <>
              <Title>Locality</Title>
            <Content>{windowName}</Content>
            {renderLayer(windowName, requestData, currentCase, currentDatabase)}
          </>
        )}
        <CloseButtonContainer
          onClick={() => {
            setWindowCoordinate(null);
            setWindowName(null);
          }}
        >
          <CloseButton iconSize={25} />
        </CloseButtonContainer>
      </InfoWindowContainer>
    </InfoBox>
  );
};

export default InfoWindow;
