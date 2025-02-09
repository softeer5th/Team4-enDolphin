import type { PropsWithChildren } from 'react';

import { useFormRef } from '@/hooks/useFormRef';

import { FormContext } from './FormContext';
import type { MeetingFormValues } from './type';

interface FormProviderProps extends PropsWithChildren {
  initialValues: MeetingFormValues;
}

export const FormProvider = ({ children, initialValues }: FormProviderProps) => {
  const values = useFormRef<MeetingFormValues>(initialValues);
  return(
    <FormContext.Provider value={values}>
      {children}
    </FormContext.Provider>
  );
};