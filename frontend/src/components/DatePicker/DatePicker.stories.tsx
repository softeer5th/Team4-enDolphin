import type { Meta, StoryObj } from '@storybook/react';

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
  render: () => <DatePicker 
    selectedCellStyle={
      {
        backgroundColor: 'blue',
        color: 'black',
      }
    }
    todayCellStyle={{
      backgroundColor: 'red',
      color: 'black',
    }}          />,
};