import { Flex } from '@/components/Flex';
import { useClickOutside } from '@/hooks/useClickOutside';
import type { FormValues } from '@/hooks/useFormRef';
import { useFormRef } from '@/hooks/useFormRef';
import { isSaturday } from '@/utils/date';
import { calcPositionByDate } from '@/utils/date/position';

import { usePersonalEventMutation, usePersonalEventUpdateMutation } from '../../api/mutations';
import type { PersonalEventRequest, PopoverType } from '../../model';
import { backgroundStyle, containerStyle } from './index.css';
import { PopoverButton } from './PopoverButton';
import { PopoverForm } from './PopoverForm';
import { Title } from './Title';

type DefaultEvent = Omit<PersonalEventRequest, 'endDateTime' | 'startDateTime'>;

interface SchedulePopoverProps extends Pick<PersonalEventRequest, 'endDateTime' | 'startDateTime'> {
  scheduleId?: number;
  values?: DefaultEvent;
  setIsOpen: (isOpen: boolean) => void;
  type: PopoverType;
}

const initEvent = (values?: DefaultEvent): DefaultEvent => {
  if (values) return values;
  return {
    title: '제목 없음',
    isAdjustable: false,
    syncWithGoogleCalendar: true,
  };
};

const useSchedulePopover = ({
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

  const handleClickCreate = () => {
    createMutate(valuesRef.current);
    setIsOpen(false);
  };

  const handleClickEdit = () => {
    if (scheduleId) editMutate({ id: scheduleId, body: valuesRef.current });
    setIsOpen(false);
  };

  const handleClickDelete = () => {
    // if (scheduleId) mutate({ ...valuesRef.current, id: scheduleId });
    setIsOpen(false);
  };

  return { handleClickCreate, handleClickEdit, handleClickDelete };
};

export const SchedulePopover = (
  { setIsOpen, scheduleId, type, values, ...event }: SchedulePopoverProps,
) => {
  const ref = useClickOutside<HTMLDialogElement>(() => setIsOpen(false));
  const startDate = new Date(event.startDateTime);
  const { x: sx, y: sy } = calcPositionByDate(startDate);
  const { valuesRef, handleChange } = useFormRef<PersonalEventRequest>({
    startDateTime: event.startDateTime,
    endDateTime: event.endDateTime,
    ...initEvent(values),
  });
  const { handleClickCreate, handleClickEdit, handleClickDelete } = useSchedulePopover({
    setIsOpen,
    scheduleId,
    valuesRef,
  });
  return(
    <Flex className={backgroundStyle}>
      <dialog
        className={containerStyle}
        ref={ref}
        style={{
          position: 'absolute',
          left: isSaturday(startDate) 
            ? `calc((100% - 72px) / 7 * ${sx - 1})` : `calc((100% - 72px) / 7 * ${sx + 1})`,
          top: 16 + sy,
        }}
      >
        <Title type={type} />
        <PopoverForm handleChange={handleChange} valuesRef={valuesRef} />
        <PopoverButton
          onClickCreate={handleClickCreate}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
          type={type}
        />
      </dialog>
    </Flex>
  ); 
};