import * as yup from 'yup';

export const medicalStaffValidationSchema = yup.object().shape({
  specialty: yup.string().required(),
  license_number: yup.string().required(),
  user_id: yup.string().nullable().required(),
  organization_id: yup.string().nullable().required(),
});
