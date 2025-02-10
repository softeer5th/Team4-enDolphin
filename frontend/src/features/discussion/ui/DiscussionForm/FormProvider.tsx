import type { FormEvent, PropsWithChildren } from 'react';

import { useFormState } from '@/hooks/useFormState';

import type { DiscussionRequestDTO } from '../../model';
import { FormContext } from './FormContext';

interface FormProviderProps extends PropsWithChildren {
  initialValues: DiscussionRequestDTO;
}

export const FormProvider = ({ children, initialValues }: FormProviderProps) => {
  const values = useFormState<DiscussionRequestDTO>(initialValues);
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