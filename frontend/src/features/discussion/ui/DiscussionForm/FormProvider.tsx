import type { PropsWithChildren } from 'react';

import { useFormState } from '@/hooks/useFormState';

import { FormContext } from './FormContext';
import type { MeetingFormValues } from './type';

interface FormProviderProps extends PropsWithChildren {
  initialValues: MeetingFormValues;
}

export const FormProvider = ({ children, initialValues }: FormProviderProps) => {
  const values = useFormState<MeetingFormValues>(initialValues);
  return(
    <FormContext.Provider value={values}>
      {children}
    </FormContext.Provider>
  );
};