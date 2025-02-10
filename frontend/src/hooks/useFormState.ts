import { useCallback, useState } from 'react';

export interface FormState<T> {
  formState: T;
  handleUpdateField: <K extends keyof T>(key: K, value: T[K]) => void;
  resetForm: () => void;
  onSubmit: () => void;
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
    // console.log(formState);
  };

  return { formState, handleUpdateField, resetForm, onSubmit };
};