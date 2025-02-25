import { useState } from 'react';

import { Checkbox } from '@/components/Checkbox';
import DatePicker from '@/components/DatePicker';
import { Flex } from '@/components/Flex';
import Input from '@/components/Input';
import { Text } from '@/components/Text';
import { Toggle } from '@/components/Toggle';
import { useMonthNavigation } from '@/hooks/useDatePicker/useMonthNavigation';
import type { FormRef } from '@/hooks/useFormRef';
import { vars } from '@/theme/index.css';
import { parseTime, setDateOnly, setTimeOnly } from '@/utils/date';
import { 
  formatDateToBarString, 
  formatDateToDateTimeString, 
  formatDateToTimeString, 
} from '@/utils/date/format';

import type { PersonalEventRequest } from '../../model';
import { cardStyle, inputStyle } from './index.css';

interface DateRange {
  startDateTime: Date | null;
  endDateTime: Date | null;
}

// TODO: Form Context 관리
const AdjustableCheckbox = (
  { valuesRef, handleChange }: FormRef<PersonalEventRequest>,
) => (
  <Checkbox
    defaultChecked={valuesRef.current.isAdjustable}
    inputProps={{
      name: 'isAdjustable',
      onChange: (e) => handleChange({ name: 'isAdjustable', value: e.target.checked }),
    }}
    size='sm'
  >
    시간 조정 가능
  </Checkbox>
);

const DateInput = ({ valuesRef, handleChange }: FormRef<PersonalEventRequest>) => {
  const startDateTime = new Date(valuesRef.current.startDateTime);
  const endDateTime = new Date(valuesRef.current.endDateTime);
  const [range, setRange] = useState<DateRange>({ startDateTime, endDateTime });
  const updateDate = (date: Date, newDate: Date | null) => 
    formatDateToDateTimeString(setDateOnly(date, newDate));

  const handleClickStartDate = (date: Date | null) => {
    handleChange({ name: 'startDateTime', value: updateDate(startDateTime, date) });
    setRange((prev) => ({ ...prev, startDateTime: date }));
  };
  const handleClickEndDate = (date: Date | null) => {
    handleChange({ name: 'endDateTime', value: updateDate(endDateTime, date) });
    setRange((prev) => ({ ...prev, endDateTime: date }));
  };
  
  return (
    <DatePicker.Range
      {...useMonthNavigation(startDateTime)}
      highlightRange={{ start: range.startDateTime, end: range.endDateTime }}
      setHighlightEnd={handleClickEndDate}
      setHighlightStart={handleClickStartDate}
      trigger={
        <Input.Multi
          label='기간 설정'
          separator='~'
          type='select'
        >
          <Input.Multi.InputField value={formatDateToBarString(startDateTime)} />
          <Input.Multi.InputField value={formatDateToBarString(endDateTime)} />
        </Input.Multi>
      }
    />
  );
};

const TimeInput = ({ valuesRef, handleChange }: FormRef<PersonalEventRequest>) => {
  const startDateTime = new Date(valuesRef.current.startDateTime);
  const endDateTime = new Date(valuesRef.current.endDateTime);

  const formatValueTimeToDateTime = (date: Date, time: string) => {
    const newDate = setTimeOnly(date, parseTime(time));
    return formatDateToDateTimeString(newDate);
  };

  return (
    <Input.Multi
      borderPlacement='container'
      label='시간 설정'
      separator='~'
      type='text'
    >
      <Input.Multi.InputField 
        defaultValue={formatDateToTimeString(startDateTime)}
        onChange={(e) => handleChange({ 
          name: 'startDateTime', 
          value: formatValueTimeToDateTime(startDateTime, e.target.value),
        })}
      />
      <Input.Multi.InputField
        defaultValue={formatDateToTimeString(endDateTime)}
        onChange={(e) => handleChange({ 
          name: 'endDateTime', 
          value: formatValueTimeToDateTime(endDateTime, e.target.value),
        })}
      />
    </Input.Multi>
  ); 
};

const GoogleCalendarToggle = (
  { valuesRef, handleChange }: FormRef<PersonalEventRequest>,
) =>
  <Toggle
    defaultChecked={valuesRef.current.syncWithGoogleCalendar}
    inputProps={{
      name: 'syncWithGoogleCalendar',
      onChange: (e) => handleChange({ name: 'syncWithGoogleCalendar', value: e.target.checked }),
    }}
  />;

export const PopoverForm = ({ valuesRef, handleChange }: FormRef<PersonalEventRequest>) => 
  <>
    <Flex
      align='flex-end'
      className={cardStyle}
      direction='column'
      gap={400}
    >
      <input
        className={inputStyle}
        defaultValue={valuesRef.current.title}
        name='title'
        onChange={(e) => handleChange({ name: 'title', value: e.target.value })}
        placeholder='새 일정'
      />
      <DateInput handleChange={handleChange} valuesRef={valuesRef} />
      <TimeInput handleChange={handleChange} valuesRef={valuesRef} />
      <AdjustableCheckbox handleChange={handleChange} valuesRef={valuesRef} />
    </Flex>
    <Flex className={cardStyle} justify='space-between'>
      <Text color={vars.color.Ref.Netural[600]} typo='caption'>구글 캘린더 연동</Text>
      <GoogleCalendarToggle handleChange={handleChange} valuesRef={valuesRef} />
    </Flex>
  </>;