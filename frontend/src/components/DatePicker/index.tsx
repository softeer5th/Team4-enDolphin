
import { DatePickerContext } from './DatePickerContext';
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

const DatePicker = ({ todayCellStyle, selectedCellStyle }: DatePickerProps) => (
  <DatePickerContext.Provider value={{ todayCellStyle, selectedCellStyle }}>
    <div className={containerStyle}>
      <Header />
      <Table />
    </div>
  </DatePickerContext.Provider>
);

export default DatePicker;
