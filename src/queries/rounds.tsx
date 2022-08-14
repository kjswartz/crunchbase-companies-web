import { useQuery } from 'react-query'
import { fetcher } from '../utils/fetcher'

export interface Round {
  company_permalink: string;
  company_name: string;
  company_category_code: string;
  company_country_code: string;
  company_state_code: string;
  company_region: string;
  company_city: string;
  funding_round_type: string;
  funded_at: string;
  funded_year: string;
  funded_month: string;
  funded_quarter: string;
  raised_amount_usd: string;

  id: string;
  created_at: string;
  updated_at: string;
}

export const useRoundsQuery = (page: number = 1) => {
  return useQuery(
    `round-${page}`,
    async () => {
      const response = await fetcher('crunchbase_rounds', page);
      const { rounds, count } = await response.json();
      return {
        rounds,
        count
      }
    }
  )
}