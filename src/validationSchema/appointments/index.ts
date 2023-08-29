import * as yup from 'yup';

export const appointmentValidationSchema = yup.object().shape({
  date: yup.date().required(),
  start_time: yup.date().required(),
  end_time: yup.date().required(),
  status: yup.string().required(),
  patient_id: yup.string().nullable().required(),
  doctor_id: yup.string().nullable().required(),
  organization_id: yup.string().nullable().required(),
});
