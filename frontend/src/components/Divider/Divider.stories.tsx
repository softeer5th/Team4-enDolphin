import type { Meta, StoryObj } from '@storybook/react';

import { vars } from '@/theme/index.css';

import { Divider } from '.';

const meta: Meta = {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {},
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { 
    width: 'full',
    height: 2,
    color: vars.color.Ref.Primary[500],
  },
};