import type { ChangeEvent } from 'react';
import { useRef } from 'react';

// Form의 value로는 다양한 값이 올 수 있습니다.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormValues<T> = { [K in keyof T]: any };

export interface FormRef<T> {
  valuesRef: { current: FormValues<T> };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const useFormRef = <T>(initialValues: FormValues<T>): FormRef<T> => {
  const valuesRef = useRef<FormValues<T>>({ ...initialValues });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    valuesRef.current[e.target.name as keyof T] = e.target.value;
  };

  return { valuesRef, handleChange };
};
