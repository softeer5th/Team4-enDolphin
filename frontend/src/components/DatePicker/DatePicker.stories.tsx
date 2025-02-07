import type { Meta, StoryObj } from '@storybook/react';

import DatePicker from '.';

const meta: Meta = {
  title: 'Calendar/DatePicker',
  component: DatePicker,
  argTypes: {
    calendarType: {
      control: { type: 'radio' },
      options: ['select', 'range'],
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    calendarType: 'select',
  },  
};