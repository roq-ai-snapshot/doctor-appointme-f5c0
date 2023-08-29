import { AppointmentInterface } from 'interfaces/appointment';
import { InsuranceProviderInterface } from 'interfaces/insurance-provider';
import { MedicalStaffInterface } from 'interfaces/medical-staff';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  appointment?: AppointmentInterface[];
  insurance_provider?: InsuranceProviderInterface[];
  medical_staff?: MedicalStaffInterface[];
  user?: UserInterface;
  _count?: {
    appointment?: number;
    insurance_provider?: number;
    medical_staff?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
