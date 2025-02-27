import { Flex } from '@/components/Flex';
import { useFormRef } from '@/hooks/useFormRef';
import { formatDateToTimeString } from '@/utils/date';
import { formatDateToBarString } from '@/utils/date/format';
import { calcPositionByDate } from '@/utils/date/position';

import { backgroundStyle, containerStyle } from './index.css';
import { PopoverButton } from './PopoverButton';
import type { PersonalEventWithDateAndTime } from './PopoverContext';
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
  const endDate = new Date(event.endDateTime);
  const { x: sx } = calcPositionByDate(startDate);

  return(
    <PopoverFormContext.Provider value={useFormRef<PersonalEventWithDateAndTime>({
      startTime: formatDateToTimeString(startDate),
      endTime: formatDateToTimeString(endDate),
      startDate: formatDateToBarString(startDate),
      endDate: formatDateToBarString(endDate),
      ...initEvent(values),
    })}
    >
      <dialog
        className={containerStyle}
        style={{
          position: 'fixed',
          left: `calc((100vw - 72px - 17.75rem) / 7 * ${sx + 1} - 3rem)`,
          top: '30vh',
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