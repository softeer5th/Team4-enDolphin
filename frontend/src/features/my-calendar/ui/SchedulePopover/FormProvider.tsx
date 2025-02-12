import type { FormEvent, PropsWithChildren } from 'react';

import { useFormState } from '@/hooks/useFormState';

import type { PersonalEventRequest } from '../../model';
import { FormContext } from './FormContext';

interface FormProviderProps extends PropsWithChildren {
  initialValues: PersonalEventRequest;
}

// TODO: Form 중복 코드. 추후 공통화 필요
export const FormProvider = ({ children, initialValues }: FormProviderProps) => {
  const values = useFormState<PersonalEventRequest>(initialValues);

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