import axios from 'axios';
import queryString from 'query-string';
import { MedicalStaffInterface, MedicalStaffGetQueryInterface } from 'interfaces/medical-staff';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getMedicalStaffs = async (
  query?: MedicalStaffGetQueryInterface,
): Promise<PaginatedInterface<MedicalStaffInterface>> => {
  const response = await axios.get('/api/medical-staffs', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createMedicalStaff = async (medicalStaff: MedicalStaffInterface) => {
  const response = await axios.post('/api/medical-staffs', medicalStaff);
  return response.data;
};

export const updateMedicalStaffById = async (id: string, medicalStaff: MedicalStaffInterface) => {
  const response = await axios.put(`/api/medical-staffs/${id}`, medicalStaff);
  return response.data;
};

export const getMedicalStaffById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/medical-staffs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMedicalStaffById = async (id: string) => {
  const response = await axios.delete(`/api/medical-staffs/${id}`);
  return response.data;
};
