import type { Meta, StoryObj } from '@storybook/react';

import DatePicker from '.';

const meta: Meta = {
  title: 'Calendar/DatePicker',
  component: DatePicker,
  args: {
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => 
    <DatePicker
      calendarType='range'
    />,
};