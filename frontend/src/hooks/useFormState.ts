import { useCallback, useId, useState } from 'react';

export interface FormState<T> {
  name: string;
  formState: T;
  handleUpdateField: <K extends keyof T>(key: K, value: T[K]) => void;
  resetForm: () => void;
  onSubmit: () => void;
  isValid: boolean;
}

export const useFormState = <T>(initialState: T): FormState<T> => {
  const [formState, setFormState] = useState<T>(initialState);

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
    // console.log(formState, isValid);
  };

  const isValid = Object.values(formState as Record<string, unknown>)
    .every((value) => value !== '');

  return { name: `form-${useId()}`, formState, handleUpdateField, resetForm, onSubmit, isValid };
};