import { useRef, useState } from 'react';

// Form의 value로는 다양한 값이 올 수 있습니다.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormValues<T> = { [K in keyof T]: any };
export type ChangeEvent<T> = { name: keyof T; value: T[keyof T] };

export interface FormRef<T> {
  valuesRef: { current: FormValues<T> };
  handleChange: ({ name, value }: ChangeEvent<T>) => void;
  setValidation: (key: keyof T, validateFn: (value: T[keyof T]) => string | null) => void;
  handleSubmit: (callback: () => void) => void;
  isValid: (key: keyof T) => boolean;
  errors: (key: keyof T) => string;
}

export type Validation<T> = Record<keyof T, <K extends keyof T>(value: T[K]) => string | null>;

export const useFormRef = <T>(initialValues: FormValues<T>): FormRef<T> => {
  const valuesRef = useRef<FormValues<T>>({ ...initialValues });
  const validationRef = useRef<Validation<T>>({} as Validation<T>);
  const [error, setError] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);

  const handleChange = ({ name, value }: ChangeEvent<T>) => {
    valuesRef.current[name] = value;
  };

  const setValidation = (key: keyof T, validateFn: (value: T[keyof T]) => string | null) => {
    validationRef.current[key] = validateFn;
  };

  const errors = (key: keyof T) => error[key];

  const isValid = (key: keyof T) => 
    !validationRef.current[key] || !validationRef.current[key](valuesRef.current[key]);

  const isValidForm = () => 
    Object.keys(validationRef.current).every((key) => isValid(key as keyof T));

  const handleSubmit = (callback: () => void) => {
    if (!isValidForm()) {
      const newError = Object.keys(validationRef.current).reduce(
        (acc, key) => {
          const error = validationRef.current[key as keyof T](valuesRef.current[key as keyof T]);
          if (error) acc[key as keyof T] = error;
          return acc;
        }, {} as Record<keyof T, string>);
      setError(newError);
      return;
    } 
    callback();
  };

  return { valuesRef, handleChange, setValidation, isValid, errors, handleSubmit };
};
