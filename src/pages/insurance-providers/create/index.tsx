import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createInsuranceProvider } from 'apiSdk/insurance-providers';
import { insuranceProviderValidationSchema } from 'validationSchema/insurance-providers';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { getUsers } from 'apiSdk/users';
import { getOrganizations } from 'apiSdk/organizations';
import { InsuranceProviderInterface } from 'interfaces/insurance-provider';

function InsuranceProviderCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: InsuranceProviderInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createInsuranceProvider(values);
      resetForm();
      router.push('/insurance-providers');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<InsuranceProviderInterface>({
    initialValues: {
      company_name: '',
      policy_number: '',
      coverage_start_date: new Date(new Date().toDateString()),
      coverage_end_date: new Date(new Date().toDateString()),
      user_id: (router.query.user_id as string) ?? null,
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: insuranceProviderValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Insurance Providers',
              link: '/insurance-providers',
            },
            {
              label: 'Create Insurance Provider',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Insurance Provider
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.company_name}
            label={'Company Name'}
            props={{
              name: 'company_name',
              placeholder: 'Company Name',
              value: formik.values?.company_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.policy_number}
            label={'Policy Number'}
            props={{
              name: 'policy_number',
              placeholder: 'Policy Number',
              value: formik.values?.policy_number,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="coverage_start_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Coverage Start Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.coverage_start_date ? new Date(formik.values?.coverage_start_date) : null}
              onChange={(value: Date) => formik.setFieldValue('coverage_start_date', value)}
            />
          </FormControl>
          <FormControl id="coverage_end_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Coverage End Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.coverage_end_date ? new Date(formik.values?.coverage_end_date) : null}
              onChange={(value: Date) => formik.setFieldValue('coverage_end_date', value)}
            />
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/insurance-providers')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'insurance_provider',
    operation: AccessOperationEnum.CREATE,
  }),
)(InsuranceProviderCreatePage);
