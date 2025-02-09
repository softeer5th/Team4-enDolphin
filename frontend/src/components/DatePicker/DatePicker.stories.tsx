import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { useMonthNavigation } from '@/hooks/useDatePicker/useMonthNavigation';

import DatePicker from '.';

const meta = {
  title: 'Calendar/DatePicker',
  component: DatePicker.Select,
  argTypes: {
    baseDate: {
      table: {
        type: { summary: 'function' },
      },
    },
    
  },
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