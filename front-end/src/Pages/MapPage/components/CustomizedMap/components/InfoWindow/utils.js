import React from 'react';
import {
  AuthorIdContainer,
  AuthorIdTitle,
  Content,
  ContentTitle,
  ListContainer,
  ListItem,
  NoData,
  ThemeTitle,
  Title,
  Title2,
} from './infoWindowStyle';
import _ from 'lodash';

export const renderLayer = (windowName, requestData, currentCase, currentDatabase) => {
  if (requestData?.length === 0)
    return (
      <>
        <NoData>NO Data For This Locality 😥</NoData>
      </>
    );

  if (
    requestData &&
    (currentCase === 'LIQUOR' || currentCase === 'GAMBLING') &&
    currentDatabase === 'SUDO'
  ) {
    const type = _.capitalize(currentCase.toLowerCase());

    return (
      <>
        <Title2>Total Number of {type} Sites In This Locality: </Title2>
        <div style={{ color: '#4d72be', textAlign: 'center', fontSize: '1.5rem' }}>
          {requestData.length}
        </div>
        <Title2>Theme&Topic: </Title2>
        <div style={{ color: '#4d72be', textAlign: 'center', fontSize: '1.5rem' }}>{type}</div>

        <Title2>{type} Sites List: </Title2>
        <ListContainer>
          {requestData.map((dataObj) => (
            <ListItem>{dataObj.value.name}</ListItem>
          ))}
        </ListContainer>
      </>
    );
  }

  if (requestData && currentCase === 'FOOD' && currentDatabase === 'SUDO') {
    const type = _.capitalize(currentCase.toLowerCase());

    return (
      <>
        <Title2>Theme&Topic: </Title2>
        <div style={{ color: '#4d72be', textAlign: 'center', fontSize: '1.5rem' }}>
          Obesity Rate
        </div>
        <Title2>Obesity Rate In This Locality </Title2>
        <div style={{ color: '#4d72be', textAlign: 'center', fontSize: '1.5rem' }}>
          {requestData[0].value.obesityRate}
        </div>
      </>
    );
  }

  if (requestData && currentCase && currentDatabase === 'INTEGRATION') {
    const type = _.capitalize(currentCase.toLowerCase());
    return (
      <>
        <Title2>Theme&Topic: </Title2>
        <div style={{ color: '#4d72be', textAlign: 'center', fontSize: '1.5rem' }}>{type}</div>
        <Title2>Indicator: </Title2>
        <div style={{ color: '#4d72be', textAlign: 'center', fontSize: '1.5rem' }}>
          {requestData.value}
        </div>
      </>
    );
  }

  if (requestData && currentCase && currentDatabase === 'TWITTER') {
    const type = currentCase.toLowerCase();
    return (
      <>
        <Title2>Total Number of Tweets in this area: </Title2>
        <div style={{ color: '#4d72be', textAlign: 'center', fontSize: '1.5rem' }}>
          {requestData.length}
        </div>
        <Title2>Theme&Topic: </Title2>
        <div style={{ color: '#4d72be', textAlign: 'center', fontSize: '1.5rem' }}>{type}</div>

        <Title2> Tweets List: </Title2>
        <ListContainer>
          {requestData.map((dataObj) => (
            <>
              <AuthorIdTitle>AuthorId:</AuthorIdTitle>
              <AuthorIdContainer>{dataObj.value.author}</AuthorIdContainer>
              <ContentTitle>Content:</ContentTitle>
              <ListItem>{dataObj.value.content}</ListItem>
            </>
          ))}
        </ListContainer>
      </>
    );
  }
};
