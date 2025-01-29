import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '.';

const meta: Meta = {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      control: { type: 'radio', options: ['sm', 'md'] },
    },
    defaultChecked: {
      control: { type: 'boolean' },
    },
    inputProps: {
      control: false,
    },
    children: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: '라벨',
  },
};