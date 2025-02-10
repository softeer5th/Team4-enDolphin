import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '.';

const meta: Meta = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    iconType: {
      control: { type: 'select', options: ['date', 'time', 'location', 'person', 'none'] },
    },
    children: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '라벨',
    iconType: 'none',
  },
};
