import styled from 'styled-components';

export const InfoWindowContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 33rem;
  border-radius: 10px;
  background-color: wheat;
  padding: 1rem 1.5rem;
  overflow: hidden;
`;

export const Title = styled.div`
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.2rem;
  font-size: 1.2rem;
  color: grey;
`;

export const Content = styled.div`
  text-align: center;
  font-size: 1.3rem;
  color: #4d72be;
`;

export const NoData = styled.div`
  text-align: center;
  margin-top: 4rem;
  font-size: 18px;
`;

export const Title2 = styled.div`
  font-weight: bold;
  margin-top: 1rem;
  font-size: 0.93rem;
  margin-bottom: 0.5rem;
  color: grey;
`;

export const ListItem = styled.div`
  color: #4d72be;
  font-size: 1rem;
`;

export const CloseButtonContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 0.7rem;
`;

export const ListContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 1.3rem;
  flex-grow: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    position: absolute;
    right: 2rem;
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    opacity: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #72add2;
    border-radius: 0.25rem;
    opacity: 0.5;
  }

  & > div:last-child {
    padding-bottom: 0;
  }
`;

export const AuthorIdContainer = styled.div`
  color: #4c63fc;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: -20px;
`;

export const AuthorIdTitle = styled.div`
  color: grey;
  font-weight: bold;
  font-size: 0.8rem;
  margin-bottom: -20px;
`;

export const ContentTitle = styled.div`
  color: grey;
  font-weight: bold;
  font-size: 0.8rem;
  margin-bottom: -20px;
`;

export const ThemeTitle = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;
