import { GuestInterface } from 'interfaces/guest';
import { MedicalStaffInterface } from 'interfaces/medical-staff';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface AppointmentInterface {
  id?: string;
  date: any;
  start_time: any;
  end_time: any;
  status: string;
  patient_id: string;
  doctor_id: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  guest?: GuestInterface;
  medical_staff?: MedicalStaffInterface;
  organization?: OrganizationInterface;
  _count?: {};
}

export interface AppointmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  patient_id?: string;
  doctor_id?: string;
  organization_id?: string;
}
