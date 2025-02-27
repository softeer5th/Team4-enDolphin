import { useState } from 'react';

import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import { useMonthNavigation } from '@/hooks/useDatePicker/useMonthNavigation';
import { formatDateToBarString } from '@/utils/date/format';

import { usePopoverFormContext } from './PopoverContext';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export const DateInput = () => {
  const { valuesRef, handleChange } = usePopoverFormContext();
  const startDate = new Date(valuesRef.current.startDate);
  const endDate = new Date(valuesRef.current.endDate);
  const [range, setRange] = useState<DateRange>({ startDate, endDate });
  
  const handleClickStartDate = (date: Date | null) => {
    handleChange({ name: 'startDate', value: formatDateToBarString(date) });
    setRange((prev) => ({ ...prev, startDate: date }));
  };
  const handleClickEndDate = (date: Date | null) => {
    handleChange({ name: 'endDate', value: formatDateToBarString(date) });
    setRange((prev) => ({ ...prev, endDate: date }));
  };
    
  return (
    <DatePicker.Range
      {...useMonthNavigation(startDate)}
      highlightRange={{ start: range.startDate, end: range.endDate }}
      setHighlightEnd={handleClickEndDate}
      setHighlightStart={handleClickStartDate}
      trigger={
        <Input.Multi
          label='기간 설정'
          separator='~'
          type='select'
        >
          <Input.Multi.InputField value={formatDateToBarString(range.startDate)} />
          <Input.Multi.InputField value={formatDateToBarString(range.endDate)} />
        </Input.Multi>
      }
    />
  );
};