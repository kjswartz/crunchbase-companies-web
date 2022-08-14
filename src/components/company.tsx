import { FC } from 'react'
import styled from 'styled-components'

import { CrunchbaseCompany } from '../graphql/schema'

interface Props {
  company: CrunchbaseCompany
}

const Company: FC<Props> = ({ company: { name, categoryCode } }) => {
  return (
    <Container>
      <Item>NAME: {name}</Item>
      <Item>CATEGORY: {categoryCode}</Item>
    </Container>
  )
}

export default Company;

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