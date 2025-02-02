import type { Meta, StoryObj } from '@storybook/react';

import { Check, CircleCheck } from '../Icon';
import Button from './index';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'destructive', 're'],
    },
    style: {
      control: { type: 'radio' },
      options: ['weak', 'filled', 'outline', 'borderless'],
    },
    radius: {
      control: { type: 'radio' },
      options: ['max', 'roundCorner'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'primary',
    style: 'filled',
    radius: 'max',
    size: 'md',
    children: '라벨',
  },
};

export const IconAdded = () => (
  <Button leftIcon={<Check />} rightIcon={<CircleCheck/>}>
    버튼
  </Button>
);