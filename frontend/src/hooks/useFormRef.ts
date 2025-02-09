import type { ChangeEvent } from 'react';
import { useRef } from 'react';

export type FormValues<T> = { [K in keyof T]: string | Date };

export interface FormRef<T> {
  valuesRef: { current: FormValues<T> };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const useFormRef = <T>(initialValues: FormValues<T>): FormRef<T> => {
  const valuesRef = useRef<FormValues<T>>({ ...initialValues });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    valuesRef.current[e.target.name as keyof T] = e.target.value;
  };

  const onSubmit = () => {
    // console.log(valuesRef.current);
  };

  return { valuesRef, handleChange, onSubmit };
};
