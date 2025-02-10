import type { FormEvent, PropsWithChildren } from 'react';

import { useFormState } from '@/hooks/useFormState';

import type { DiscussionRequest } from '../../model';
import { FormContext } from './FormContext';

interface FormProviderProps extends PropsWithChildren {
  initialValues: DiscussionRequest;
}

export const FormProvider = ({ children, initialValues }: FormProviderProps) => {
  const values = useFormState<DiscussionRequest>(initialValues);
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