import { Flex } from '@/components/Flex';
import { useFormRef } from '@/hooks/useFormRef';
import { isSaturday } from '@/utils/date';
import { calcPositionByDate } from '@/utils/date/position';

import { useSchedulePopover } from '../../api/hooks';
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

export const SchedulePopover = (
  { setIsOpen, scheduleId, type, values, ...event }: SchedulePopoverProps,
) => {
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
    <>
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
          onClickCreate={handleClickCreate}
          onClickDelete={handleClickDelete}
          onClickEdit={handleClickEdit}
          type={type}
        />
      </dialog>
      <Flex className={backgroundStyle} onClick={() => setIsOpen(false)} />
    </>
  ); 
};