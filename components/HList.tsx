import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import VMedia from './VMedia';

const ListContainer = styled.View`
  margin-bottom: 40px;
`;
const ListTitle = styled.Text`
  margin: 0 0 20px 30px;
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  font-size: 18px;
`;
const HListSeperator = styled.View`
  width: 20px;
`;
interface HListProps {
  title: string;
  data: any[];
}
const HList: React.FC<HListProps> = ({ title, data }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      ItemSeparatorComponent={HListSeperator}
      keyExtractor={(item) => item.id + ''}
      renderItem={({ item }) => (
        <VMedia
          poster_path={item.poster_path}
          original_title={item.original_title ?? item.original_name}
          vote_average={item.vote_average}
        />
      )}
    />
  </ListContainer>
);

export default HList;
