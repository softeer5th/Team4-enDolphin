import { useRef } from 'react';

// Form의 value로는 다양한 값이 올 수 있습니다.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormValues<T> = { [K in keyof T]: any };
export type ChangeEvent<T> = { name: keyof T; value: T[keyof T] };

export interface FormRef<T> {
  valuesRef: { current: FormValues<T> };
  handleChange: ({ name, value }: ChangeEvent<T>) => void;
  setValidation: (key: keyof T, validateFn: (value: T[keyof T]) => string | null) => void;
  handleSubmit: (callback: () => void) => void;
}

export type Validation<T> = Record<keyof T, <K extends keyof T>(value: T[K]) => string | null>;

export const useFormRef = <T>(initialValues: FormValues<T>): FormRef<T> => {
  const valuesRef = useRef<FormValues<T>>({ ...initialValues });
  const validationRef = useRef<Validation<T>>({} as Validation<T>);

  const handleChange = ({ name, value }: ChangeEvent<T>) => {
    valuesRef.current[name] = value;
  };

  const setValidation = (key: keyof T, validateFn: (value: T[keyof T]) => string | null) => {
    validationRef.current[key] = validateFn;
  };

  const handleSubmit = (callback: () => void) => {
    const isValid = Object.keys(validationRef.current)
      .every((key) => !validationRef.current[key as keyof T](valuesRef.current[key as keyof T]));
    if (isValid) callback();
  };

  return { valuesRef, handleChange, setValidation, handleSubmit };
};
