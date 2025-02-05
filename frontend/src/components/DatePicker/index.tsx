
import useDatePicker from '@/hooks/useDatePicker';
import { vars } from '@/theme/index.css';

import { DatePickerContext } from './DatePickerContext';
import Header from './Header';
import { containerStyle } from './index.css';
import Table from './Table';

export interface CellStyleProps {
  backgroundColor?: string;
  color?: string;
}

export type CalendarType = 'select' | 'range';

export interface DatePickerProps {
  calendarType: CalendarType;
}

// TODO: container style 외부에서 주입할 수 있도록 구현
const DatePicker = ({ calendarType }: DatePickerProps) => {
  const useDatePickerReturns = useDatePicker();
  const todayCellStyle = getTodayCellStyle(calendarType);
  const selectedCellStyle = getSelectedCellStyle(calendarType);
  return (
    <DatePickerContext.Provider 
      value={{ calendarType, todayCellStyle, selectedCellStyle, ...useDatePickerReturns }}
    >
      <div className={containerStyle}>
        <Header />
        <Table />
      </div>
    </DatePickerContext.Provider>
  );
};

const getTodayCellStyle = (calendarType: CalendarType) => calendarType === 'select'
  ? { backgroundColor: vars.color.Ref.Primary[500], color: vars.color.Ref.Netural['White'] }
  : { };

const getSelectedCellStyle = (calendarType: CalendarType) => calendarType === 'select'
  ? { backgroundColor: vars.color.Ref.Primary[100], color: vars.color.Ref.Primary[500] }
  : { backgroundColor: vars.color.Ref.Primary[500], color: vars.color.Ref.Netural['White'] };
export default DatePicker;
