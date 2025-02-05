
import useMonthCalendar from '@/hooks/useMonthCalendar';

import Header from './Header';
import { containerStyle } from './index.css';
import { MonthCalendarContext } from './MonthCalendarContext';
import Table from './Table';

interface CellStyleProps {
  backgroundColor?: string;
  color?: string;
}

type CalendarType = 'select' | 'range';

export interface DatePickerProps {
  calendarType: CalendarType;
  todayCellStyle: CellStyleProps;
  selectedCellStyle: CellStyleProps;
}

// TODO: container style 외부에서 주입할 수 있도록 구현
const DatePicker = ({ calendarType, todayCellStyle, selectedCellStyle }: DatePickerProps) => {
  const monthCalendar = useMonthCalendar();
  return (
    <MonthCalendarContext.Provider 
      value={{ calendarType, todayCellStyle, selectedCellStyle, ...monthCalendar }}
    >
      <div className={containerStyle}>
        <Header />
        <Table />
      </div>
    </MonthCalendarContext.Provider>
  );
};

export default DatePicker;
