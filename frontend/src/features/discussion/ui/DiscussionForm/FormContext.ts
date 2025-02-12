import { createContext } from 'react';

import type { FormState } from '@/hooks/useFormState';
import { useSafeContext } from '@/hooks/useSafeContext';

import type { DiscussionRequest } from '../../model';

export const FormContext = createContext<FormState<DiscussionRequest> | null>(null);

export const useFormContext = () => useSafeContext(FormContext);