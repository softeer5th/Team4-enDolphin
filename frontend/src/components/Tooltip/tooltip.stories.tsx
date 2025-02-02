import type { Meta, StoryObj } from '@storybook/react';

import Tooltip from '.';

const meta = {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    tailDirection: {
      control: {
        type: 'select',
        options: ['top', 'bottom', 'left', 'right'],
      },
    },
    color: {
      control: {
        type: 'select',
        options: ['blue', 'black'],
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutButton: Story = {
  args: {
    color: 'blue',
    tailDirection: 'up',
  },
  render: (args) => (
    <Tooltip {...args} >label</Tooltip>
  ),
};

export const WithButton: Story = {
  args: {
    button: 'btn',
    color: 'blue',
    tailDirection: 'up',
  },
  render: (args) => (
    <Tooltip {...args} >type anything</Tooltip>
  ),
};
