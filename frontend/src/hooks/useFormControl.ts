import { useReducer } from 'react';

type FormValues = Record<string, string>;

type Action = { name: string; value: string };

const reducer = (state: FormValues, action: Action) => ({
  ...state,
  [action.name]: action.value,
});

interface FormControlReturn {
  values: FormValues;
  handleChange: ({ name, value }: { name: string; value: string }) => void;
}

export const useFormControl = (initialValues: FormValues): FormControlReturn => {
  const [values, dispatch] = useReducer(reducer, initialValues);

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    dispatch({ name, value });
  };

  return { values, handleChange };
};