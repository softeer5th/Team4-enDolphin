import type { RefObject } from 'react';
import { useCallback, useId, useRef, useState } from 'react';

export type Validation<T> = Record<keyof T, <K extends keyof T>(value: T[K]) => boolean>;

export interface FormState<T> {
  name: string;
  formState: T;
  handleUpdateField: <K extends keyof T>(key: K, value: T[K]) => void;
  onSubmit: () => void;
  setValidation: (key: keyof T, validateFn: () => boolean) => void;
  validationRef: RefObject<Validation<T>>;
  isSubmitted: boolean;
}

export const useFormState = <T>(initialState: T): FormState<T> => {
  const [formState, setFormState] = useState<T>(initialState);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const validationRef = useRef<Validation<T>>({} as Validation<T>);

  const handleUpdateField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const onSubmit = () => {
    setIsSubmitted(true);
  };

  const setValidation = useCallback((key: keyof T, validateFn: () => boolean) => {
    validationRef.current[key] = validateFn;
  }, []);

  return {
    name: `form-${useId()}`, 
    formState, 
    handleUpdateField, 
    onSubmit, 
    setValidation, 
    isSubmitted,
    validationRef,
  };
};