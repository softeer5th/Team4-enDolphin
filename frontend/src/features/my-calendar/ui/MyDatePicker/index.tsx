import { useSharedCalendarContext } from '@/components/Calendar/context/SharedCalendarContext';
import DatePicker from '@/components/DatePicker';

import { pickerStyle } from './index.css';

export const MyDatePicker = () => {
  const calendar = useSharedCalendarContext();
  
  return (
    <DatePicker.Select
      className={pickerStyle}
      handleDateSelect={calendar.handleSelectDate}
      {...calendar}
    />
  );
};