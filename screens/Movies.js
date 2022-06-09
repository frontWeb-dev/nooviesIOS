import React from 'react';
import styled from 'styled-components/native';

// style
const Container = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const Movies = ({ navigation: { navigate } }) => (
  <Container onPress={() => navigate('Stack', { screen: 'One' })}>
    <Title>Movies</Title>
  </Container>
);

export default Movies;
