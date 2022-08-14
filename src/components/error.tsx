import { FC } from 'react'
import styled from 'styled-components'

const Loader: FC = () => (
  <Error>ERROR</Error> 
)

export default Loader

const Error = styled.div`
  color: red;
  font-weight: 700;
`;
