import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { map, isEmpty } from 'lodash/fp'

import Company from './company'
import Loader from './loader'
import Error from './error'
import NoResults from './noResults'
import { useCrunchbaseCompaniesQuery, CrunchbaseCompany } from '../graphql/schema'
import { useThrottle } from '../utils/useThrottle'

const Companies: FC = () => {
  const [value, setValue] = useState('')
  const [search, setSearch] = useState<string | null>(null)
  const throttledQuery = useThrottle(2000)

  const { data, loading, error } = useCrunchbaseCompaniesQuery({
    variables: { search }
  })

  const updateQuery = (newValue: string) => setSearch(newValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    throttledQuery(updateQuery, e.target.value)
  };
  const { crunchbaseCompanies } = data || {};
  return (
    <Container>
      <SearchFilter 
        value={value}
        onChange={onChange}
        placeholder={'Search Companies'}
      />
      {loading 
        ? <Loader />
        : error 
          ? <Error />
          : isEmpty(crunchbaseCompanies) 
            ? <NoResults /> 
            : map((company: CrunchbaseCompany) => (
                <CompanyContainer key={company.id}>
                  <Company company={company}/>
                </CompanyContainer>
              ), crunchbaseCompanies)
      }
    </Container>
  )
}

export default Companies;

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

const CompanyContainer = styled.div`
  border: 1px solid black;
  margin: 10px 0;
`;
