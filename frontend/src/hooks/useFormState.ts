import { useCallback, useId, useRef, useState } from 'react';

export type Validation<T> = Record<keyof T, <K extends keyof T>(value: T[K]) => string | null>;

export interface FormState<T> {
  name: string;
  formState: T;
  handleUpdateField: <K extends keyof T>(key: K, value: T[K]) => void;
  setValidation: (key: keyof T, validateFn: () => string) => void;
  isValid: (key: keyof T) => boolean;
  errors: (key: keyof T) => string;
  isValidForm: () => boolean;
}

export const useFormState = <T extends object>(initialState: T): FormState<T> => {
  const [formState, setFormState] = useState<T>(initialState);
  const validationRef = useRef<Validation<T>>({} as Validation<T>);

  const handleUpdateField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setValidation = useCallback(
    (key: keyof T, validateFn: (value: T[keyof T]) => string | null) => {
      validationRef.current[key] = validateFn;
    }, []);

  const errors = (key: keyof T) => validationRef.current[key](formState[key]) || '';

  const isValid = (key: keyof T) => 
    !validationRef.current[key] || !validationRef.current[key](formState[key]);

  const isValidForm = () => 
    Object.keys(validationRef.current).every((key) => isValid(key as keyof T));

  return {
    name: `form-${useId()}`, 
    formState, 
    handleUpdateField, 
    setValidation, 
    errors,
    isValid,
    isValidForm,
  };
};