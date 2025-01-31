import type { Meta, StoryObj } from '@storybook/react';

import { Calendar } from '.';

const meta: Meta = {
  title: 'Calendar',
  component: Calendar,
  argTypes: {

  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {

  },
};