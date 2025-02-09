import { createContext } from 'react';

import type { FormRef } from '@/hooks/useFormRef';
import { useSafeContext } from '@/hooks/useSafeContext';

import type { MeetingFormValues } from './type';

export const FormContext = createContext<FormRef<MeetingFormValues> | null>(null);

export const useFormContext = () => useSafeContext(FormContext);