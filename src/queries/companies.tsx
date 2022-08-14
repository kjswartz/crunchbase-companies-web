import { useQuery } from 'react-query'
import { fetcher } from '../utils/fetcher'

export interface ICompany {
  category_code?: string;
  city?: string;
  country_code?: string;
  created_at: string;
  first_funding_at?: string;
  founded_at?: string;
  founded_month?: string;
  founded_quarter?: string;
  founded_year?: string;
  funding_rounds?: string;
  funding_total_usd?: number;
  id: string;
  last_funding_at?: string;
  last_milestone_at?: string;
  name?: string;
  permalink?: string;
  region?: string;
  state_code?: string;
  status?: string;
  updated_at: string;
}

export const useCompaniesQuery = (page: number = 1) => {
  return useQuery(
    `company-${page}`,
    async () => {
      const response = await fetcher('crunchbase_companies', page);
      const { crunchbase_companies, count } = await response.json();
      return {
        companies: crunchbase_companies,
        count
      }
    }
  )
}