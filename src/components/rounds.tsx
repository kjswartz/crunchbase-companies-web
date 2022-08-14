import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { map, isEmpty } from 'lodash/fp'

import Round from './round'
import Loader from './loader'
import Error from './error'
import NoResults from './noResults'
import { useCrunchbaseRoundsQuery, CrunchbaseRound } from '../graphql/schema'
import { useThrottle } from '../utils/useThrottle'

const Rounds: FC = () => {
  const [value, setValue] = useState('')
  const [search, setSearch] = useState<string | null>(null)
  const throttledQuery = useThrottle(2000)

  const { data, loading, error } = useCrunchbaseRoundsQuery({
    variables: { search }
  })

  const updateQuery = (newValue: string) => setSearch(newValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    throttledQuery(updateQuery, e.target.value)
  };
  const { crunchbaseRounds } = data || {};
  return (
    <Container>
      <SearchFilter 
        value={value}
        onChange={onChange}
        placeholder={'Search Round'}
      />
      {loading 
        ? <Loader />
        : error 
          ? <Error />
          : isEmpty(crunchbaseRounds) 
            ? <NoResults /> 
            : map((round: CrunchbaseRound) => (
                <ItemContainer key={round.id}>
                  <Round round={round}/>
                </ItemContainer>
              ), crunchbaseRounds)
      }
    </Container>
  )
}

export default Rounds;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchFilter = styled.input`
  width: 320px;
  height: 20px;
  font-size: 12px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  border: 1px solid black;
  margin: 10px 0;
`;