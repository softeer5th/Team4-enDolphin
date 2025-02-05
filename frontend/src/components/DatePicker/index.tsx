
import useMonthCalendar from '@/hooks/useMonthCalendar';

import { MonthCalendarContext } from './DatePickerContext';
import Header from './Header';
import { containerStyle } from './index.css';
import Table from './Table';

interface CellStyleProps {
  backgroundColor?: string;
  color?: string;
}

export interface DatePickerProps {
  todayCellStyle: CellStyleProps;
  selectedCellStyle: CellStyleProps;
}

// TODO: container style 외부에서 주입할 수 있도록 구현
const DatePicker = ({ todayCellStyle, selectedCellStyle }: DatePickerProps) => {
  const monthCalendar = useMonthCalendar();
  return (
    <MonthCalendarContext.Provider value={{ todayCellStyle, selectedCellStyle, ...monthCalendar }}>
      <div className={containerStyle}>
        <Header />
        <Table />
      </div>
    </MonthCalendarContext.Provider>
  );
};

export default DatePicker;
