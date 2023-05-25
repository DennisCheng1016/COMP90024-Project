export const drawColor = (map, requestData) => {
  map.data.setStyle((feature) => {
    const name = feature.getProperty('vic_lga__3');
    if (requestData) {
      const obj = requestData.find((obj) => obj.key === name);
      if (obj) {
        return {
          fillColor: getColor(obj.value, requestData),
          fillOpacity: 0.6,
          strokeWeight: 1,
        };
      }
    }
  });
};

const BASE_URL = 'http://45.113.235.62:3000/api/';

export const getData = async (url) => {
  const response = await fetch(`${BASE_URL}${url}`);
  if (!response.ok) {
    throw new Error('error');
  }
  return await response.json();
};

export const getColor = (amount, requestData) => {
  const numberArr = requestData.map((data) => data.value).sort((a, b) => a - b);

  let degree = findInterval(numberArr, amount);

  function findInterval(arr, num) {
    arr.sort((a, b) => a - b);

    const intervalSize = Math.ceil(arr.length / 7);

    let intervalIndex = -1;
    for (let i = 0; i < arr.length; i += intervalSize) {
      if (num <= arr[i]) {
        intervalIndex = Math.floor(i / intervalSize) + 1;
        break;
      }
    }

    if (intervalIndex === -1) {
      intervalIndex = 7;
    }

    return intervalIndex;
  }

  switch (degree) {
    case 1:
      return '#ffffff';
    case 2:
      return '#b7c1fc';
    case 3:
      return '#b0c7f8';
    case 4:
      return '#417dfa';
    case 5:
      return '#5066ee';
    case 6:
      return '#2b46e7';
    default:
      return '#00139f';
  }
};
