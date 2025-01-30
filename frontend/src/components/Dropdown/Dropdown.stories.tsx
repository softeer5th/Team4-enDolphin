import type { Meta } from '@storybook/react';
import { useState } from 'react';

import { Dropdown } from '.';
import { DropdownItem } from './DropdownItem';

const meta: Meta = {
  title: 'Dropdown',
  component: Dropdown,
  argTypes: {

  },
} satisfies Meta<typeof Dropdown>;

export default meta;

export const Primary = () => {
  const [selectedValue, setSelectedValue] = useState('Item 1');
  const handleChange = (value: string) => setSelectedValue(value);
  
  return (
    <Dropdown 
      height={200}
      onChange={handleChange} 
      selectedValue={selectedValue} 
      trigger={<input type='text' value={selectedValue} width={100} />}
    >
      <DropdownItem value='Item 1'>Item 1</DropdownItem>
      <DropdownItem value='Item 2'>Item 2</DropdownItem>
      <DropdownItem value='Item 3'>Item 3</DropdownItem>
      <DropdownItem value='Item 4'>Item 4</DropdownItem>
      <DropdownItem value='Item 5'>Item 5</DropdownItem>
    </Dropdown>
  );
};