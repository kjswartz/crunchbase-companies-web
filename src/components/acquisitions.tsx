import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { map, isEmpty } from 'lodash/fp'

import Acquisition from './acquisition'
import Loader from './loader'
import Error from './error'
import NoResults from './noResults'
import { useCrunchbaseAcquisitionsQuery, CrunchbaseAcquisition } from '../graphql/schema'
import { useThrottle } from '../utils/useThrottle'

const Acquisitions: FC = () => {
  const [value, setValue] = useState('')
  const [search, setSearch] = useState<string | null>(null)
  const throttledQuery = useThrottle(2000)

  const { data, loading, error } = useCrunchbaseAcquisitionsQuery({
    variables: { search }
  })
  console.log('data', data)
  const updateQuery = (newValue: string) => setSearch(newValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    throttledQuery(updateQuery, e.target.value)
  };
  const { crunchbaseAcquisitions } = data || {};
  return (
    <Container>
      <SearchFilter 
        value={value}
        onChange={onChange}
        placeholder={'Search Acquisitions'}
      />
      {loading 
        ? <Loader />
        : error 
          ? <Error />
          : isEmpty(crunchbaseAcquisitions) 
            ? <NoResults /> 
            : map((acquisition: CrunchbaseAcquisition) => (
                <ItemContainer key={acquisition.id}>
                  <Acquisition acquisition={acquisition}/>
                </ItemContainer>
              ), crunchbaseAcquisitions)
      }
    </Container>
  )
}

export default Acquisitions;

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
