// import React, { FC, useState } from 'react'
// import styled from 'styled-components'
// import { map, isEmpty } from 'lodash/fp'

// import Investment from './investment'
// import Loader from './loader'
// import Error from './error'
// import NoResults from './noResults'
// import { useCrunchbaseInvestmentsQuery, CrunchbaseInvestment } from '../graphql/schema'
// import { useThrottle } from '../utils/useThrottle'

// const Investments: FC = () => {
//   const [value, setValue] = useState('')
//   const [search, setSearch] = useState<string | null>(null)
//   const throttledQuery = useThrottle(2000)

//   const { data, loading, error } = useCrunchbaseInvestmentsQuery({
//     variables: { search }
//   })

//   const updateQuery = (newValue: string) => setSearch(newValue)

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setValue(e.target.value)
//     throttledQuery(updateQuery, e.target.value)
//   };
//   const { crunchbaseInvestments } = data || {};
//   return (
//     <Container>
//       <SearchFilter 
//         value={value}
//         onChange={onChange}
//         placeholder={'Search Investments'}
//       />
//       {loading 
//         ? <Loader />
//         : error 
//           ? <Error />
//           : isEmpty(crunchbaseInvestments) 
//             ? <NoResults /> 
//             : map((investment: CrunchbaseInvestment) => (
//                 <ItemContainer key={investment.id}>
//                   <Investment investment={investment}/>
//                 </ItemContainer>
//               ), crunchbaseInvestments)
//       }
//     </Container>
//   )
// }

const Investments = () => {
  return (
    <div>IIISSS</div>
  )
}
export default Investments;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const SearchFilter = styled.input`
//   width: 320px;
//   height: 20px;
//   font-size: 12px;
//   margin-bottom: 10px;
// `;

// const ItemContainer = styled.div`
//   border: 1px solid black;
//   margin: 10px 0;
// `;
