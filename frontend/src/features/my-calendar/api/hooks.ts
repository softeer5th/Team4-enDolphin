import type { FormValues } from '@/hooks/useFormRef';

import type { PersonalEventRequest } from '../model';
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
  valuesRef: { current: FormValues<PersonalEventRequest> };
}) => {
  const { mutate: createMutate } = usePersonalEventMutation();
  const { mutate: editMutate } = usePersonalEventUpdateMutation();
  const { mutate: deleteMutate } = usePersonalEventDeleteMutation();
  
  const handleClickCreate = () => {
    createMutate(valuesRef.current);
    reset?.();
    setIsOpen(false);
  };
  
  const handleClickEdit = () => {
    if (scheduleId) editMutate({ id: scheduleId, body: valuesRef.current });
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
  