import { FC } from 'react'
import styled from 'styled-components'

const Loader: FC = () => (
  <Loading>LOADING...</Loading> 
)

export default Loader

const Loading = styled.div`
  color: blue;
  font-weight: 700;
`;