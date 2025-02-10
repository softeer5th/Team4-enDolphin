
import type { ReactNode } from '@tanstack/react-router';

import DatePickerRange from './DatePickerRange';
import DatePickerSelect from './DatePickerSelect';

export type DatePickerType = 'select' | 'range';

export interface CommonDatePickerProps {
  baseDate: Date;
  gotoNextMonth: () => void;
  gotoPrevMonth: () => void;
  trigger?: ReactNode;
}

const DatePicker = () => {
  throw new Error('!!! DatePicker.Select, DatePicker.Range를 사용해주세요 !!!');
};

DatePicker.Select = DatePickerSelect;
DatePicker.Range = DatePickerRange;

export default DatePicker;
