import { useFormRef } from '@/hooks/useFormRef';
import { isSaturday } from '@/utils/date';
import { calcPositionByDate } from '@/utils/date/position';

import { usePersonalEventMutation } from '../../api/mutations';
import type { PersonalEventRequest, PopoverType } from '../../model';
import { containerStyle } from './index.css';
import { PopoverButton } from './PopoverButton';
import { PopoverForm } from './PopoverForm';
import { Title } from './Title';

interface SchedulePopoverProps extends Pick<PersonalEventRequest, 'endDateTime' | 'startDateTime'> {
  setIsOpen: (isOpen: boolean) => void;
  type: PopoverType;
}

const defaultEvent: Omit<PersonalEventRequest, 'endDateTime' | 'startDateTime'> = {
  title: '제목 없음',
  isAdjustable: false,
  syncWithGoogleCalendar: true,
};

export const SchedulePopover = (
  { setIsOpen, type, ...event }: SchedulePopoverProps,
) => {
  const { mutate } = usePersonalEventMutation();
  const startDate = new Date(event.startDateTime);
  const { x: sx, y: sy } = calcPositionByDate(startDate);
  const { valuesRef, handleChange } = useFormRef<PersonalEventRequest>({
    startDateTime: event.startDateTime,
    endDateTime: event.endDateTime,
    ...defaultEvent,
  });
  const handleClickSave = () => {
    mutate(valuesRef.current);
    setIsOpen(false);
  };
  const handleClickDelete = () => {
    // do something
  };
  return(
    <dialog
      className={containerStyle}
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
        onClickDelete={handleClickDelete}
        onClickSave={handleClickSave}
        type={type}
      />
    </dialog>
  ); 
};