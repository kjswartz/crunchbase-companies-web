import { useQuery } from 'react-query'
import { fetcher } from '../utils/fetcher'

export interface IAcquisition {
  company_permalink: string;
  company_name: string;
  company_category_code: string;
  company_country_code: string;
  company_state_code: string;
  company_region: string;
  company_city: string;
  acquirer_permalink: string;
  acquirer_name: string;
  acquirer_category_code: string;
  acquirer_country_code: string;
  acquirer_state_code: string;
  acquirer_region: string;
  acquirer_city: string;
  acquired_at: string;
  acquired_month: string;
  acquired_quarter: string;
  acquired_year: string;
  price_amount: string;
  price_currency_code: string;

  id: string;
  created_at: string;
  updated_at: string;
}

export const useAcquisitionsQuery = (page: number = 1) => {
  return useQuery(
    `acquisition-${page}`,
    async () => {
      const response = await fetcher('crunchbase_acquisitions', page);
      const { crunchbase_acquisitions, count } = await response.json();
      return {
        acquisitions: crunchbase_acquisitions,
        count
      }
    }
  )
}