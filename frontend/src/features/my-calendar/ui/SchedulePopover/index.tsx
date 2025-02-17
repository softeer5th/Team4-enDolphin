import { Flex } from '@/components/Flex';
import { useFormRef } from '@/hooks/useFormRef';
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
  reset?: () => void;
}

const initEvent = (values?: DefaultEvent): DefaultEvent => {
  if (values) return values;
  return {
    title: '제목 없음',
    isAdjustable: false,
    syncWithGoogleCalendar: true,
  };
};

const Background = ({ setIsOpen, reset }: Pick<SchedulePopoverProps, 'setIsOpen' | 'reset'>) => (
  <Flex
    className={backgroundStyle}
    onClick={() => {
      setIsOpen(false);
      reset?.();
    }}
  />
);

export const SchedulePopover = (
  { setIsOpen, reset, scheduleId, type, values, ...event }: SchedulePopoverProps,
) => {
  const startDate = new Date(event.startDateTime);
  const { x: sx } = calcPositionByDate(startDate);
  const { valuesRef, handleChange } = useFormRef<PersonalEventRequest>({
    startDateTime: event.startDateTime,
    endDateTime: event.endDateTime,
    ...initEvent(values),
  });
  const { handleClickCreate, handleClickEdit, handleClickDelete } = useSchedulePopover({
    setIsOpen,
    reset,
    scheduleId,
    valuesRef,
  });
  return(
    <>
      <dialog
        className={containerStyle}
        style={{
          position: 'fixed',
          left: `calc((100vw - 72px - 17.75rem) / 7 * ${sx + 1})`,
          top: '50vh',
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
      <Background reset={reset} setIsOpen={setIsOpen} />
    </>
  ); 
};