import React from 'react';
import { useQuery, gql, QueryHookOptions, QueryResult } from '@apollo/client';

export interface Company {
  __typename?: 'CrunchbaseCompany';
  categoryCode?: string;
  city?: string;
  countryCode?: string;
  createdAt: string;
  firstFundingAt?: string;
  foundedAt?: string;
  foundedMonth?: string;
  foundedQuarter?: string;
  foundedYear?: string;
  fundingRounds?: string;
  fundingTotalUsd?: number;
  id: string;
  lastFundingAt?: string;
  lastMilestoneAt?: string;
  name?: string;
  permalink?: string;
  region?: string;
  stateCode?: string;
  status?: string;
  updatedAt: string;
}

export type QueryCompaniesArgs = {
  search?: string;
  page?: number;
  per_page?: number;
};


export const GET_COMPANIES = gql`
  query Companies($search: String, $page: Number, $per_page: Number) {
    companies(search: $search, page: $page, per_page: $per_page) {
      id
      name
      status
      categoryCode
      fundingTotalUsd
      status
      countryCode
      stateCode
      region
      city
      fundingRounds
      foundedAt
      foundedMonth
      foundedQuarter
      foundedYear
      firstFundingAt
      lastFundingAt
      lastMilestoneAt
    }
  }
`;
export type CompaniesQuery = { __typename?: 'Query', companies: Array<Company> };

export function useCompaniesQuery(baseOptions?: QueryHookOptions<CompaniesQuery, QueryCompaniesArgs>) {
  return useQuery<CompaniesQuery, QueryCompaniesArgs>(GET_COMPANIES, baseOptions);
}

export type CompaniesQueryHookResult = ReturnType<typeof useCompaniesQuery>;
export type CompaniesQueryResult = QueryResult<CompaniesQuery, QueryCompaniesArgs>;