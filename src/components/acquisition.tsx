import { FC } from 'react'
import styled from 'styled-components'

import { CrunchbaseAcquisition } from '../graphql/schema'

interface Props {
  acquisition: CrunchbaseAcquisition
}

const Acquisition: FC<Props> = ({ acquisition: { companyName, acquirerName } }) => {
  return (
    <Container>
      <Item>COMPANY NAME: {companyName}</Item>
      <Item>ACQUIRER: {acquirerName}</Item>
    </Container>
  )
}

export default Acquisition;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  position: relative;
`;

const Item = styled.div`
  display: flex;
`;

const Link = styled.a`
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`