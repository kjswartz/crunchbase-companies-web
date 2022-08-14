import { useQuery } from 'react-query'
import { fetcher } from '../utils/fetcher'

export interface Investment {
  company_permalink: string;
  company_name: string;
  company_category_code: string;
  company_country_code: string;
  company_state_code: string;
  company_region: string;
  company_city: string;
  investor_permalink: string;
  investor_name: string;
  investor_category_code: string;
  investor_country_code: string;
  investor_state_code: string;
  investor_region: string;
  investor_city: string;
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

export const useInvestmentsQuery = (page: number = 1) => {
  return useQuery(
    `investment-${page}`,
    async () => {
      const response = await fetcher('crunchbase_investments', page);
      const { crunchbase_investments, count } = await response.json();
      return {
        investments: crunchbase_investments,
        count
      }
    }
  )
}