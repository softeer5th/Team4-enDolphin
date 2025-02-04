import type { Meta, StoryObj } from '@storybook/react';

import { Flex } from '.';

const meta: Meta = {
  title: 'Flex',
  component: Flex,
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    direction: { control: 'radio' },
    justify: { control: 'radio' },
    align: { control: 'radio' },
    gap: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { 
    width: 'full',
    direction: 'column',
    children: [<div key='item1'>item1</div>, <div key='item2'>item2</div>],
    gap: 10,
  },
};