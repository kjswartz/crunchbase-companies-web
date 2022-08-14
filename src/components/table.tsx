import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { map, isEmpty } from 'lodash'

const Table: FC = () => {
  const HEADER = [
    {key: 'a', value: 'a'},
    {key: 'b', value: 'b'},
    {key: 'c', value: 'c'},
    {key: 'd', value: 'd'},
    {key: 'e', value: 'e'},
  ];
  const BODY = [{a: 'a'},{b: 'b'},{c: 'c'},{d: 'd'},{e: 'e'}];
  return (
    <Container>
      <Header>
        {map(HEADER,
          (h: any) => (
          <HeaderColumn key={h.key}>{h.value}</HeaderColumn>
          )
        )}
      </Header>
      <Body>
      {map(BODY, (b: any) => (
          <BodyRow>
            {map(HEADER, (h: any) => (
              <BodyColumn>{b[h.key]}</BodyColumn>
            ))}
          </BodyRow>
        ))}
      </Body>
    </Container>
  )
};

export default Table;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
`;

const HeaderColumn = styled.div`
  display: flex;
  border: 1px solid #000;
  padding: 5px;
`;

const Body = styled.div`
  display: flex;
`;

const BodyRow = styled.div`
  display: flex;
`;

const BodyColumn = styled.div`
  display: flex;
`;