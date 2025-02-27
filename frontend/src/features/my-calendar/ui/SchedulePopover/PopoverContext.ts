import { createContext } from 'react';

import type { FormRef } from '@/hooks/useFormRef';
import { useSafeContext } from '@/hooks/useSafeContext';

import type { PersonalEventRequest } from '../../model';

export interface PersonalEventWithDateAndTime 
  extends Omit<PersonalEventRequest, 'startDateTime' | 'endDateTime'> {
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
}

export const PopoverFormContext = createContext<FormRef<PersonalEventWithDateAndTime> | null>(null);
export const usePopoverFormContext = () => useSafeContext(PopoverFormContext);