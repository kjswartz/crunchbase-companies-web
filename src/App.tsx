import { FC, useState, useMemo } from 'react'
import { ApolloProvider } from '@apollo/client'
import styled from 'styled-components'

import { client } from './apolloClient'

import Header from './components/header'
import Companies from './components/companies'
import Acquisitions from './components/acquisitions'
import Investments from './components/investments'
import Rounds from './components/rounds'

const App: FC = () => {
  const [display, setDisplay] = useState<string | null>();

  const bodyDisplay = useMemo(() => {
    switch(display){
      case 'acquisitions':
        return <Acquisitions />;
      case 'companies':
        return <Companies />;
      case 'investments':
        return <Investments />;
      case 'rounds':
        return <Rounds />;
      default: 
        return <>Welcome</>;
    }
  }, [display])


 return (
  <ApolloProvider client={client}>
      <Container>
        <Header />
        <Body>
          <Row>
            <Button onClick={() => setDisplay('acquisitions')}>Acquisitions</Button>
            <Button onClick={() => setDisplay('companies')}>Companies</Button>
            <Button onClick={() => setDisplay('investments')}>Investments</Button>
            <Button onClick={() => setDisplay('rounds')}>Rounds</Button>
          </Row>
          <Row>{bodyDisplay}</Row>
        </Body>
      </Container>
    </ApolloProvider>
  )
}
export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  border: 1px solid blue;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.div`
  height: 20px;
  width: 200px;
  display: flex;
  justify-content: center;
  border: 1px solid red;
  cursor: pointer;
  &:hover {
    background-color: pink;
  }
`

const Row = styled.div`
  display: flex;
  border: 1px solid green;
  padding: 10px 0;
  margin: 10px 0;
`;