import type { Meta, StoryObj } from '@storybook/react';

import { Chip } from '.';

const meta: Meta = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    color: {
      options: ['blue', 'green', 'red', 'black'],
      control: { type: 'radio' },
    },
    variant: {
      options: ['borderless', 'weak', 'filled'],
      control: { type: 'radio' },
    },
    radius: {
      options: ['round', 'max'],
      control: { type: 'radio' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    children: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: '라벨',
    color: 'blue',
    variant: 'weak',
    radius: 'round',
    size: 'md',
  },
};

export const Borderness: Story = {
  args: {
    children: '라벨',
    color: 'blue',
    variant: 'borderless',
    radius: 'round',
    size: 'md',
  },
};