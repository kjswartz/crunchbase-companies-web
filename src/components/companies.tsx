import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { isEmpty } from 'lodash/fp'

import Loader from './loader'
import Error from './error'
import NoResults from './noResults'
import { useCompaniesQuery, Company } from '../queries/companies'
import { DataTable } from './data-table'
import { Pagination } from './data-table/pagination'

const COLUMNS = [
  {
    id: 'name',
    displayName: 'Name',
    renderCell: (item: Company) => <div>{item.name}</div>,
  },
  {
    id: 'category',
    displayName: 'Category',
    renderCell: (item: Company) => <div>{item.category_code}</div>,
  },
  {
    id: 'funding_rounds',
    displayName: 'Funding Rounds',
    renderCell: (item: Company) => <div>{item.funding_rounds}</div>,
  },
  {
    id: 'funding_total_usd',
    displayName: 'Funding Total',
    renderCell: (item: Company) => <div>{item.funding_total_usd ? `$${item.funding_total_usd}` : '-'}</div>,
  },
]

const Companies: FC = () => {
  const [page, setPage] = useState<number>(1)
  const { data, isLoading, error } = useCompaniesQuery(page)
  
  const { companies, count } = data || {};
  return (
    <Container>
      {isLoading 
        ? <Loader /> 
        : error 
          ? <Error />
          : isEmpty(companies) 
            ? <NoResults /> 
            : (
              <>
                <DataTable columns={COLUMNS}  data={companies} rowKey={'id'}/>
                <Pagination totalItems={count} page={page} onChange={(({ page }) => setPage(page))}/>
              </>
            )
      }
    </Container>
  )
}

export default Companies;

const Container = styled.div`
  width: 100%;
`;