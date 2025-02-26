import { createContext } from 'react';

import type { FormRef } from '@/hooks/useFormRef';
import { useSafeContext } from '@/hooks/useSafeContext';

import type { PersonalEventRequest } from '../../model';

export const PopoverFormContext = createContext<FormRef<PersonalEventRequest> | null>(null);
export const usePopoverFormContext = () => useSafeContext(PopoverFormContext);