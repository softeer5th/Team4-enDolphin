import type { Meta, StoryObj } from '@storybook/react';

import Avatar from '.';

const meta: Meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
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
    imageUrls: [
      'https://picsum.photos/200',
      'https://picsum.photos/201',
      'https://picsum.photos/202',
      'https://picsum.photos/203',
      'https://picsum.photos/204',
      'https://picsum.photos/205',
    ],
  },
};

export const FetchError: Story = {
  args: {
    size: 'sm',
    imageUrls: [
      'https://hi.com/',
      'https://hi.com/',
      'https://hi.com/',
      'https://hi.com/',
    ],
  },
};
