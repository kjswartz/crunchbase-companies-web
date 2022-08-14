import { FC, useState, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from "react-query";

import styled from 'styled-components'

import Header from './components/header'
import Companies from './components/companies'
import Acquisitions from './components/acquisitions'
import Investments from './components/investments'
import Rounds from './components/rounds'

const queryClient = new QueryClient({});


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
    <QueryClientProvider client={queryClient}>
      <Container>
        <Header />
        <Body>
          <HeaderRow>
            <Button isActive={display === 'acquisitions'} onClick={() => setDisplay('acquisitions')}>Acquisitions</Button>
            <Button isActive={display === 'companies'} onClick={() => setDisplay('companies')}>Companies</Button>
            <Button isActive={display === 'investments'} onClick={() => setDisplay('investments')}>Investments</Button>
            <Button isActive={display === 'rounds'} onClick={() => setDisplay('rounds')}>Rounds</Button>
          </HeaderRow>
          <BodyRow>{bodyDisplay}</BodyRow>
        </Body>
      </Container>
    </QueryClientProvider>
  )
}
export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.div<{ isActive: boolean }>`
  height: 20px;
  width: 200px;
  height: 100%;
  display: flex;
  justify-content: center;
  border: 1px solid red;
  cursor: pointer;
  &:hover {
    background-color: pink;
  }
  background-color: ${({ isActive }) => (isActive ? 'pink' : '#fff')};
`

const HeaderRow = styled.div`
  display: flex;
  padding: 10px 0;
  margin: 10px 0;
`;

const BodyRow = styled.div`
  display: flex;
  padding: 10px 0;
  margin: 10px 0;
  width: 100%;
`;