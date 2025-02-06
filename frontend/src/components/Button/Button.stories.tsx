import type { Meta, StoryObj } from '@storybook/react';

import { Check, CircleCheck } from '../Icon';
import Button from './index';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
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

export const Default: StoryObj<typeof Button> = {
  args: {
    children: '버튼',
  },
};

export const WithIcon: StoryObj<typeof Button> = {
  args: {
    leftIcon: <Check />,
    rightIcon: <CircleCheck />,
    children: '버튼',
  },
};