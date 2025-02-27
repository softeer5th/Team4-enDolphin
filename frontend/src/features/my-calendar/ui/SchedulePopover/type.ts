import type { PersonalEventRequest, PopoverType } from '../../model';

export type DefaultEvent = Omit<PersonalEventRequest, 'endDateTime' | 'startDateTime'>;

export interface SchedulePopoverBaseProps {
  scheduleId?: number;
  values?: DefaultEvent;
  setIsOpen: (isOpen: boolean) => void;
  type: PopoverType;
  reset?: () => void;
}

export type SchedulePopoverProps 
  = SchedulePopoverBaseProps & Pick<PersonalEventRequest, 'endDateTime' | 'startDateTime'>;