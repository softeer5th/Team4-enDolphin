import { createContext } from 'react';

import type { FormState } from '@/hooks/useFormState';
import { useSafeContext } from '@/hooks/useSafeContext';

import type { MeetingFormValues } from './type';

export const FormContext = createContext<FormState<MeetingFormValues> | null>(null);

export const useFormContext = () => useSafeContext(FormContext);