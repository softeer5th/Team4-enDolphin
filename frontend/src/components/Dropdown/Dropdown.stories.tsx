import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from '.';
import { DropdownItem } from './DropdownItem';

const meta: Meta = {
  title: 'Dropdown',
  component: Dropdown,
  argTypes: {

  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    trigger: <input type='text' width={100} />,
    height: 200,
    children: [
      <DropdownItem selected={false}>Item 1</DropdownItem>,
      <DropdownItem selected={true}>Item 2</DropdownItem>,
      <DropdownItem selected={false}>Item 3</DropdownItem>,
      <DropdownItem selected={false}>Item 4</DropdownItem>,
      <DropdownItem selected={false}>Item 5</DropdownItem>,
    ],
  },
};