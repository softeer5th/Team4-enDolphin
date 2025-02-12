import { createContext } from 'react';

import type { FormState } from '@/hooks/useFormState';
import { useSafeContext } from '@/hooks/useSafeContext';

import type { PersonalEventRequest } from '../../model';

export const FormContext = createContext<FormState<PersonalEventRequest> | null>(null);

export const useFormContext = () => useSafeContext(FormContext);