import type { FormValues } from '@/hooks/useFormRef';

import type { PersonalEventWithDateAndTime } from '../ui/SchedulePopover/PopoverContext';
import { 
  usePersonalEventDeleteMutation, 
  usePersonalEventMutation, 
  usePersonalEventUpdateMutation, 
} from './mutations';

export const useSchedulePopover = ({
  setIsOpen,
  reset,
  scheduleId,
  valuesRef,
}: {
  setIsOpen: (isOpen: boolean) => void;
  reset?: () => void;
  scheduleId?: number;
  valuesRef: { current: FormValues<PersonalEventWithDateAndTime> };
}) => {
  const { mutate: createMutate } = usePersonalEventMutation();
  const { mutate: editMutate } = usePersonalEventUpdateMutation();
  const { mutate: deleteMutate } = usePersonalEventDeleteMutation();
  const createSchedule = () => {
    const { startTime, startDate, endDate, endTime, ...values } = valuesRef.current;
    const startDateTime = `${valuesRef.current.startDate}T${valuesRef.current.startTime}`;
    const endDateTime = `${valuesRef.current.endDate}T${valuesRef.current.endTime}`;
    return { ...values, startDateTime, endDateTime };
  };
  const handleClickCreate = () => {
    createMutate(createSchedule());
    reset?.();
    setIsOpen(false);
  };
  const handleClickEdit = () => {
    if (scheduleId) editMutate({ id: scheduleId, body: createSchedule() });
    reset?.();
    setIsOpen(false);
  };
  const handleClickDelete = () => {
    if (scheduleId) deleteMutate({
      id: scheduleId,
      syncWithGoogleCalendar: valuesRef.current.syncWithGoogleCalendar,
    });
    reset?.();
    setIsOpen(false);
  };
  return { handleClickCreate, handleClickEdit, handleClickDelete };
};
  