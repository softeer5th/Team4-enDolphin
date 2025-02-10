import { createContext } from 'react';

import type { FormState } from '@/hooks/useFormState';
import { useSafeContext } from '@/hooks/useSafeContext';

import type { DiscussionRequestDTO } from '../../model';

export const FormContext = createContext<FormState<DiscussionRequestDTO> | null>(null);

export const useFormContext = () => useSafeContext(FormContext);