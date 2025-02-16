import type { FormValues } from '@/hooks/useFormRef';

import type { PersonalEventRequest } from '../model';
import { 
  usePersonalEventDeleteMutation, 
  usePersonalEventMutation, 
  usePersonalEventUpdateMutation, 
} from './mutations';

export const useSchedulePopover = ({
  setIsOpen,
  scheduleId,
  valuesRef,
}: {
  setIsOpen: (isOpen: boolean) => void;
  scheduleId?: number;
  valuesRef: { current: FormValues<PersonalEventRequest> };
}) => {
  const { mutate: createMutate } = usePersonalEventMutation();
  const { mutate: editMutate } = usePersonalEventUpdateMutation();
  const { mutate: deleteMutate } = usePersonalEventDeleteMutation();
  
  const handleClickCreate = () => {
    createMutate(valuesRef.current);
    setIsOpen(false);
  };
  
  const handleClickEdit = () => {
    if (scheduleId) editMutate({ id: scheduleId, body: valuesRef.current });
    setIsOpen(false);
  };
  
  const handleClickDelete = () => {
    if (scheduleId) deleteMutate(scheduleId);
    setIsOpen(false);
  };
  
  return { handleClickCreate, handleClickEdit, handleClickDelete };
};
  