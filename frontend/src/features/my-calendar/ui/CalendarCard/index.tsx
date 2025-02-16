import { useState } from 'react';

import { formatDateToDateTimeString } from '@/utils/date/format';

import { SchedulePopover } from '../SchedulePopover';
import { Card } from './Card';
import type { CalendarCardProps } from './type';

export const CalendarCard = ({ 
  id,
  size = 'lg', 
  startTime, 
  endTime, 
  ...props
}: CalendarCardProps) => {
  const [open, setOpen] = useState(false);
  const handleClickEdit = () => {
    setOpen(true);
  };
  return (
    <>
      {open && 
      <SchedulePopover
        endDateTime={formatDateToDateTimeString(endTime)}
        scheduleId={id}
        setIsOpen={setOpen}
        startDateTime={formatDateToDateTimeString(startTime)}
        type='edit'
      />}
      <Card
        endTime={endTime}
        handleClickEdit={handleClickEdit}
        id={id}
        size={size}
        startTime={startTime}
        {...props}
      />
    </>
  );
};