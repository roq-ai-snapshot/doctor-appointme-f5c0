import * as yup from 'yup';

export const insuranceProviderValidationSchema = yup.object().shape({
  company_name: yup.string().required(),
  policy_number: yup.string().required(),
  coverage_start_date: yup.date().required(),
  coverage_end_date: yup.date().required(),
  user_id: yup.string().nullable().required(),
  organization_id: yup.string().nullable().required(),
});
