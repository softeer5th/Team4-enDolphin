
import type { ReactNode } from '@tanstack/react-router';

import DatePickerSelect from './DatePickerSelect';

export interface CellStyleProps {
  backgroundColor?: string;
  color?: string;
}

export type CalendarType = 'select' | 'range';

export interface CommonDatePickerProps {
  baseDate: Date;
  handleBaseDateChange: (date: Date) => void;
  gotoNextMonth: () => void;
  gotoPrevMonth: () => void;
  trigger?: ReactNode;
}

// TODO: container style 외부에서 주입할 수 있도록 구현
const DatePicker = () => {
  throw new Error('!!! DatePicker.Select, DatePicker.Range를 사용해주세요 !!!');
};

DatePicker.Select = DatePickerSelect;

export default DatePicker;
