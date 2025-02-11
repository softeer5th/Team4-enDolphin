import type { Meta, StoryObj } from '@storybook/react';

import { Calendar } from '.';

const meta: Meta = {
  title: 'Calendar/Calendar',
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;

export const Default = () => (
  <Calendar>
    <Calendar.Core />
    <Calendar.Table />
  </Calendar>
);
