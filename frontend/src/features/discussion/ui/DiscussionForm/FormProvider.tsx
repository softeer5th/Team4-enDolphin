import type { PropsWithChildren } from 'react';

import { useFormState } from '@/hooks/useFormState';

import type { DiscussionRequest } from '../../model';
import { FormContext } from './FormContext';

interface FormProviderProps extends PropsWithChildren {
  initialValues: DiscussionRequest;
}

export const FormProvider = ({ children, initialValues }: FormProviderProps) => {
  const values = useFormState<DiscussionRequest>(initialValues);

  return(
    <FormContext.Provider value={values}>
      <form className={values.name}>
        {children}
      </form>
    </FormContext.Provider>
  );
};