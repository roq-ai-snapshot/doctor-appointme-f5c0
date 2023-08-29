import axios from 'axios';
import queryString from 'query-string';
import { InsuranceProviderInterface, InsuranceProviderGetQueryInterface } from 'interfaces/insurance-provider';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getInsuranceProviders = async (
  query?: InsuranceProviderGetQueryInterface,
): Promise<PaginatedInterface<InsuranceProviderInterface>> => {
  const response = await axios.get('/api/insurance-providers', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createInsuranceProvider = async (insuranceProvider: InsuranceProviderInterface) => {
  const response = await axios.post('/api/insurance-providers', insuranceProvider);
  return response.data;
};

export const updateInsuranceProviderById = async (id: string, insuranceProvider: InsuranceProviderInterface) => {
  const response = await axios.put(`/api/insurance-providers/${id}`, insuranceProvider);
  return response.data;
};

export const getInsuranceProviderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/insurance-providers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteInsuranceProviderById = async (id: string) => {
  const response = await axios.delete(`/api/insurance-providers/${id}`);
  return response.data;
};
