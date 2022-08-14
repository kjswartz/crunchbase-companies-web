import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { isEmpty } from 'lodash/fp'

import Loader from './loader'
import Error from './error'
import NoResults from './noResults'
import { useRoundsQuery, Round } from '../queries/rounds'
import { DataTable } from './data-table'
import { Pagination } from './data-table/pagination'

const COLUMNS = [
  {
    id: 'name',
    displayName: 'Company Name',
    renderCell: (item: Round) => <div>{item.company_name}</div>,
  },
  {
    id: 'company_category_code',
    displayName: 'Company  Category',
    renderCell: (item: Round) => <div>{item.company_category_code}</div>,
  },
  {
    id: 'funding_round_type',
    displayName: 'Type',
    renderCell: (item: Round) => <div>{item.funding_round_type}</div>,
  },
  {
    id: 'raised_amount_usd',
    displayName: 'Raised Amount',
    renderCell: (item: Round) => <div>{item.raised_amount_usd ? `$${item.raised_amount_usd}` : '-'}</div>,
  }
]

const Rounds: FC = () => {
  const [page, setPage] = useState<number>(1)
  const { data, isLoading, error } = useRoundsQuery(page)
  
  const { rounds, count } = data || {};
  return (
    <Container>
      {isLoading 
        ? <Loader /> 
        : error 
          ? <Error />
          : isEmpty(rounds) 
            ? <NoResults /> 
            : (
              <>
                <DataTable columns={COLUMNS}  data={rounds} rowKey={'id'}/>
                <Pagination totalItems={count} page={page} onChange={(({ page }) => setPage(page))}/>
              </>
            )
      }
    </Container>
  )
}

export default Rounds;

const Container = styled.div`
  width: 100%;
`;