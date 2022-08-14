import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { isEmpty } from 'lodash/fp'

import Loader from './loader'
import Error from './error'
import NoResults from './noResults'
import { useInvestmentsQuery, Investment } from '../queries/investments'
import { DataTable } from './data-table'
import { Pagination } from './data-table/pagination'

const COLUMNS = [
  {
    id: 'name',
    displayName: 'Company Name',
    renderCell: (item: Investment) => <div>{item.company_name}</div>,
  },
  {
    id: 'company_category_code',
    displayName: 'Company  Category',
    renderCell: (item: Investment) => <div>{item.company_category_code}</div>,
  },
  {
    id: 'raised_amount_usd',
    displayName: 'Raised Amount',
    renderCell: (item: Investment) => <div>{item.raised_amount_usd ? `$${item.raised_amount_usd}` : '-'}</div>,
  }
]

const Investments: FC = () => {
  const [page, setPage] = useState<number>(1)
  const { data, isLoading, error } = useInvestmentsQuery(page)
  
  const { investments, count } = data || {};
  return (
    <Container>
      {isLoading 
        ? <Loader /> 
        : error 
          ? <Error />
          : isEmpty(investments) 
            ? <NoResults /> 
            : (
              <>
                <DataTable columns={COLUMNS}  data={investments} rowKey={'id'}/>
                <Pagination totalItems={count} page={page} onChange={(({ page }) => setPage(page))}/>
              </>
            )
      }
    </Container>
  )
}

export default Investments;

const Container = styled.div`
  width: 100%;
`;