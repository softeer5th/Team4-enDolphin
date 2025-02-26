import { Flex } from '@/components/Flex';
import { useFormRef } from '@/hooks/useFormRef';
import { calcPositionByDate } from '@/utils/date/position';

import type { PersonalEventRequest } from '../../model';
import { backgroundStyle, containerStyle } from './index.css';
import { PopoverButton } from './PopoverButton';
import { PopoverFormContext } from './PopoverContext';
import { PopoverForm } from './PopoverForm';
import { Title } from './Title';
import type { DefaultEvent, SchedulePopoverProps } from './type';

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

  return(
    <PopoverFormContext.Provider value={useFormRef<PersonalEventRequest>({
      startDateTime: event.startDateTime,
      endDateTime: event.endDateTime,
      ...initEvent(values),
    })}
    >
      <dialog
        className={containerStyle}
        style={{
          position: 'fixed',
          left: `calc((100vw - 72px - 17.75rem) / 7 * ${sx + 1})`,
          top: '50vh',
        }}
      >
        <Title type={type} />
        <PopoverForm />
        <PopoverButton
          reset={reset}
          scheduleId={scheduleId}
          setIsOpen={setIsOpen}
          type={type}
        />
      </dialog>
      <Background reset={reset} setIsOpen={setIsOpen} />
    </PopoverFormContext.Provider>
  ); 
};