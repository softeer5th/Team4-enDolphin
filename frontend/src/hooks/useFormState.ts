import type { RefObject } from 'react';
import { useCallback, useId, useRef, useState } from 'react';

export type Validation<T> = Record<keyof T, <K extends keyof T>(value: T[K]) => boolean>;

export interface FormState<T> {
  name: string;
  formState: T;
  handleUpdateField: <K extends keyof T>(key: K, value: T[K]) => void;
  resetForm: () => void;
  onSubmit: () => void;

  setValidation: (key: keyof T, validateFn: () => boolean) => void;
  validationRef: RefObject<Validation<T>>;
  isValid: boolean;
}

export const useFormState = <T>(initialState: T): FormState<T> => {
  const [formState, setFormState] = useState<T>(initialState);
  const validationRef = useRef<Validation<T>>({} as Validation<T>);

  const handleUpdateField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState(initialState);
  }, [initialState]);

  const onSubmit = () => {
    // console.log(formState);
  };

  const setValidation = useCallback((key: keyof T, validateFn: () => boolean) => {
    validationRef.current[key] = validateFn;
  }, []);

  const isValid = Object.keys(formState as Record<string, unknown>).every((key) => {
    const validateFn = validationRef.current[key as keyof T];
    return validateFn?.(formState[key as keyof T]);
  });

  return {
    name: `form-${useId()}`, 
    formState, 
    handleUpdateField, 
    resetForm,
    onSubmit, 
    setValidation, 
    isValid, 
    validationRef,
  };
};