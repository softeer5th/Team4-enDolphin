import { useSharedCalendarContext } from '@/components/Calendar/context/SharedCalendarContext';
import DatePicker from '@/components/DatePicker';
import { useMonthNavigation } from '@/hooks/useDatePicker/useMonthNavigation';

import { pickerStyle } from './index.css';

export const MyDatePicker = () => {
  const calendar = useSharedCalendarContext();
  const monthNavigation = useMonthNavigation();
  
  return (
    <DatePicker.Select
      className={pickerStyle}
      handleDateSelect={calendar.handleSelectDate}
      selectedDate={calendar.selectedDate}
      {...monthNavigation}
    />
  );
};