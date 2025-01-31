import type { Meta, StoryObj } from '@storybook/react';

import { Notification } from '.';

const meta: Meta = {
  title: 'Notification',
  component: Notification,
  argTypes: {
  },
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'succes',
    title: 'title',
    description: 'description',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    title: 'title',
    description: 'description',
  },
};

export const NoDescription: Story = {
  args: {
    type: 'succes',
    title: '일정 조율 삭제가 완료됐어요',
  },
};