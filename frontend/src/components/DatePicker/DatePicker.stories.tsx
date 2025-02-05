import type { Meta, StoryObj } from '@storybook/react';

import { vars } from '@/theme/index.css';

import DatePicker from '.';

const meta: Meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  args: {
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => 
    <DatePicker
      selectedCellStyle={
        {
          backgroundColor: vars.color.Ref.Primary[200],
          color: vars.color.Ref.Primary[500],
        }
      }
      todayCellStyle={{
        backgroundColor: vars.color.Ref.Primary[500],
        color: vars.color.Ref.Netural['White'],
      }}
    />,
};