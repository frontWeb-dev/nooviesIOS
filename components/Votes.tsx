import React from 'react';
import styled from 'styled-components/native';

interface VotesProps {
  votes: number;
}

const Text = styled.Text`
  font-size: 10px;
  color: ${(props) => props.theme.textColor};
  opacity: 0.8;
`;
const Votes: React.FC<VotesProps> = ({ votes }) => {
  return <Text>{votes > 0 ? `⭐️ ${votes} / 10` : null}</Text>;
};

export default Votes;
