import type { FormEvent, PropsWithChildren } from 'react';

import { useFormState } from '@/hooks/useFormState';

import { FormContext } from './FormContext';
import type { MeetingFormValues } from './type';

interface FormProviderProps extends PropsWithChildren {
  initialValues: MeetingFormValues;
}

export const FormProvider = ({ children, initialValues }: FormProviderProps) => {
  const values = useFormState<MeetingFormValues>(initialValues);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    values.onSubmit();
  };
  return(
    <FormContext.Provider value={values}>
      <form className={values.name} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
};