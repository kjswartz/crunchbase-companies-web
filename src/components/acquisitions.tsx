import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { isEmpty } from 'lodash/fp'

import Loader from './loader'
import Error from './error'
import NoResults from './noResults'
import { useAcquisitionsQuery, Acquisition } from '../queries/acquisitions'
import { DataTable } from './data-table'
import { Pagination } from './data-table/pagination'

const COLUMNS = [
  {
    id: 'name',
    displayName: 'Company Name',
    renderCell: (item: Acquisition) => <div>{item.company_name}</div>,
  },
  {
    id: 'company_category_code',
    displayName: 'Company  Category',
    renderCell: (item: Acquisition) => <div>{item.company_category_code}</div>,
  },
  {
    id: 'price_amount',
    displayName: 'Price',
    renderCell: (item: Acquisition) => <div>{item.price_amount ? `$${item.price_amount}` : '-'}</div>,
  }
]

const Companies: FC = () => {
  const [page, setPage] = useState<number>(1)
  const { data, isLoading, error } = useAcquisitionsQuery(page)
  
  const { acquisitions, count } = data || {};
  return (
    <Container>
      {isLoading 
        ? <Loader /> 
        : error 
          ? <Error />
          : isEmpty(acquisitions) 
            ? <NoResults /> 
            : (
              <>
                <DataTable columns={COLUMNS}  data={acquisitions} rowKey={'id'}/>
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