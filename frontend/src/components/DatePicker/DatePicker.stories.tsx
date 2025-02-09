import type { Meta } from '@storybook/react';
import { useState } from 'react';

import { useHighlightRange } from '@/hooks/useDatePicker/useHighlightRange';
import { useMonthNavigation } from '@/hooks/useDatePicker/useMonthNavigation';

import DatePicker from '.';

const meta = {
  title: 'Calendar/DatePicker',
  component: DatePicker.Select,
} satisfies Meta<typeof DatePicker.Select>;

export default meta;

// export default meta;

// type Story = StoryObj<typeof DatePicker.Select>;

export const Default = () => {
  const { setBaseDate, ...monthNavigation } = useMonthNavigation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker.Select
      handleBaseDateChange={(date) => setBaseDate(date)}
      handleDateSelect={(date) => setSelectedDate(date)}
      selectedDate={selectedDate}
      {...monthNavigation}
    />
  );
};

export const Range = () => {
  const { setBaseDate, ...monthNavigation } = useMonthNavigation();
  const highlightProps = useHighlightRange();

  return (
    <DatePicker.Range
      handleBaseDateChange={(date) => setBaseDate(date)}
      {...monthNavigation}
      {...highlightProps}
    />
  );
};