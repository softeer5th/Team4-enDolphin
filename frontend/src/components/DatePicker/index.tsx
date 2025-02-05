
import useDatePicker from '@/hooks/useDatePicker';

import { DatePickerContext } from './DatePickerContext';
import Header from './Header';
import { containerStyle } from './index.css';
import Table from './Table';

interface CellStyleProps {
  backgroundColor?: string;
  color?: string;
}

export type CalendarType = 'select' | 'range';

export interface DatePickerProps {
  calendarType: CalendarType;
  todayCellStyle: CellStyleProps;
  selectedCellStyle: CellStyleProps;
}

// TODO: container style 외부에서 주입할 수 있도록 구현
const DatePicker = ({ calendarType, todayCellStyle, selectedCellStyle }: DatePickerProps) => {
  const monthCalendar = useDatePicker();
  return (
    <DatePickerContext.Provider 
      value={{ calendarType, todayCellStyle, selectedCellStyle, ...monthCalendar }}
    >
      <div className={containerStyle}>
        <Header />
        <Table />
      </div>
    </DatePickerContext.Provider>
  );
};

export default DatePicker;
