import { useState } from 'react';

import { Calendar } from '@/components/Calendar';
import { useSelectTime } from '@/hooks/useSelectTime';
import { useTableContext } from '@/pages/MyCalendarPage/TableContext';
import { formatDateToDateTimeString } from '@/utils/date/format';

import type { PersonalEventResponse } from '../../model';
import { CalendarCardList } from '../CalendarCardList';
import { SchedulePopover } from '../SchedulePopover';
import { CalendarDiscussionBox } from './CalendarDiscussionBox';
import { CalendarTimeBar } from './CalendarTimeBar';
import { containerStyle } from './index.css';

const CalendarTable = (
  { personalEvents = [] }: { personalEvents?: PersonalEventResponse[] },
) => {
  const { handleMouseUp, reset, ...time } = useSelectTime();
  const { tableRef, height } = useTableContext();
  const [open, setOpen] = useState(false);
  
  const handleMouseUpAddSchedule = () => {
    if (!time.selectedStartTime && !time.selectedEndTime) return;
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
      <CalendarDiscussionBox />
      <CalendarCardList cards={personalEvents} />
      <CalendarTimeBar height={height} />
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
  