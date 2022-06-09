import React from 'react';
import styled from 'styled-components/native';

// style
const Container = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text``;
const Movies = ({ navigation: { navigate } }) => (
  <Container onPress={() => navigate('Stack', { screen: 'One' })}>
    <Title>Movies</Title>
  </Container>
);

export default Movies;
