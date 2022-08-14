import React, { FC } from 'react'
import styled from 'styled-components'

const Header: FC = () => {
  return (
    <Container>
      <Banner>
        <Title>645 Web App</Title>
      </Banner>
    </Container>
  )
}

export default Header

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #000;
  height: 100px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 32px;
  color: #666;
  font-weight: 700;
  margin: auto;
`;