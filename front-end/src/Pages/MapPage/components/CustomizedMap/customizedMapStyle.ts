import styled from 'styled-components';

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  z-index: 1000;
  right: 10px;
  top: 10px;
`;

export const SpinContainer = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 9999;
  background: linear-gradient(#4c5261 0%, #30343a 100%);
`;

export const MapStyles = [
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 13,
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#144b53',
      },
      {
        lightness: 14,
      },
      {
        weight: 1.4,
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        color: '#08304b',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#0c4152',
      },
      {
        lightness: 5,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#0b434f',
      },
      {
        lightness: 25,
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#0b3d51',
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        color: '#146474',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        color: '#021019',
      },
    ],
  },
];
