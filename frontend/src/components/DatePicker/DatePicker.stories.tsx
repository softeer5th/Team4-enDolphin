import type { Meta } from '@storybook/react';
import { useState } from 'react';

import { useHighlightRange } from '@/hooks/useDatePicker/useHighlightRange';
import { useMonthNavigation } from '@/hooks/useDatePicker/useMonthNavigation';
import { useSharedCalendar } from '@/hooks/useSharedCalendar';

import { SharedCalendarContext } from '../Calendar/context/SharedCalendarContext';
import Input from '../Input';
import DatePicker from '.';
import { injectedContainerStyle } from './datePicker.stories.css';

const meta = {
  title: 'Calendar/DatePicker',
  component: DatePicker.Select,
} satisfies Meta<typeof DatePicker.Select>;

export default meta;

export const Default = () => {
  const { setBaseDate, ...monthNavigation } = useMonthNavigation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  return (
    <DatePicker.Select
      handleDateSelect={(date) => setSelectedDate(date)}
      selectedDate={selectedDate}
      {...monthNavigation}
    />
  );
};

export const InjectedContainerStyle = () => {
  const { setBaseDate, ...monthNavigation } = useMonthNavigation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // width: 228
  // height: 300
  return (
    <>
      <DatePicker.Select
        className={injectedContainerStyle}
        handleDateSelect={(date) => setSelectedDate(date)}
        selectedDate={selectedDate}
        {...monthNavigation}
      />
      <div>----------------------------------</div>
    </>
  );
};

export const Range = () => {
  const { setBaseDate, ...monthNavigation } = useMonthNavigation();
  const highlightProps = useHighlightRange();

  return (
    <DatePicker.Range
      {...monthNavigation}
      {...highlightProps}
    />
  );
};

export const RangeWithTrigger = () => {
  const { setBaseDate, ...monthNavigation } = useMonthNavigation();
  const highlightProps = useHighlightRange();

  return (
    <DatePicker.Range
      trigger={
        <Input.Multi
          label='기간 설정'
          required={true}
          type='text'
        >
          <Input.Multi.InputField
            placeholder='시작 날짜를 선택하세요'
          />
          <Input.Multi.InputField
            placeholder='종료 날짜를 선택하세요'
          />
        </Input.Multi>
      }
      {...monthNavigation}
      {...highlightProps}
    />
  );
};

export const SyncWithSharedContext = () => {
  const props = useSharedCalendar();
  const { handleSelectDate, selectedDate } = props;
  const monthNavigation = useMonthNavigation();

  return (
    <SharedCalendarContext.Provider value={props}>
      <DatePicker.Select
        handleDateSelect={handleSelectDate}
        selectedDate={selectedDate}
        {...monthNavigation}
      />
      {/* <Calendar {...props}/> */}
    </SharedCalendarContext.Provider>
  );
};
