import { useState } from 'react';

import { Calendar } from '@/components/Calendar';
import { useSelectTime } from '@/hooks/useSelectTime';
import { formatDateToDateTimeString } from '@/utils/date/format';

import type { PersonalEventResponse } from '../../model';
import { CalendarCardList } from '../CalendarCardList';
import { SchedulePopover } from '../SchedulePopover';
import { containerStyle } from './index.css';
import { useScrollToCurrentTime } from './useScrollToCurrentTime';

const CalendarTable = (
  { personalEvents = [] }: { personalEvents?: PersonalEventResponse[] },
) => {
  const { handleMouseUp, reset, ...time } = useSelectTime();
  const [open, setOpen] = useState(false);
  const { tableRef } = useScrollToCurrentTime();
  
  const handleMouseUpAddSchedule = () => {
    setOpen(true);
  };
  
  return (
    <div className={containerStyle({ open })} ref={tableRef}>
      {open && 
        <SchedulePopover
          endDateTime={formatDateToDateTimeString(time.doneEndTime)}
          reset={reset}
          setIsOpen={setOpen}
          startDateTime={formatDateToDateTimeString(time.doneStartTime)}
          type='add'
        />}
      <CalendarCardList cards={personalEvents} />
      <Calendar.Table 
        context={{
          handleMouseUp: () => handleMouseUp(handleMouseUpAddSchedule),
          reset: () => {
            setOpen(false);
            reset();
          },
          ...time,
        }}
      />
    </div>
  );
};

export default CalendarTable;
  