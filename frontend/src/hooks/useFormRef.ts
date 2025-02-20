import { useRef } from 'react';

// Form의 value로는 다양한 값이 올 수 있습니다.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormValues<T> = { [K in keyof T]: any };
export type ChangeEvent<T> = { name: keyof T; value: T[keyof T] };

export interface FormRef<T> {
  valuesRef: { current: FormValues<T> };
  handleChange: ({ name, value }: ChangeEvent<T>) => void;
}

export const useFormRef = <T>(initialValues: FormValues<T>): FormRef<T> => {
  const valuesRef = useRef<FormValues<T>>({ ...initialValues });

  const handleChange = ({ name, value }: ChangeEvent<T>) => {
    valuesRef.current[name] = value;
  };

  return { valuesRef, handleChange };
};
