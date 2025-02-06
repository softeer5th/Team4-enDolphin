import type { Meta, StoryObj } from '@storybook/react';

import Avatar from '.';

const meta: Meta = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: { type: 'radio', options: ['sm', 'lg'] },
    },
    imageUrls: {
      control: false,
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    size: 'sm',
    imageUrls: ['1', '2', '3', '4', '5', '6'],
  },
};