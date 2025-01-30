import type { Meta } from '@storybook/react';
import { useState } from 'react';

import { Dropdown } from '.';

const meta: Meta = {
  title: 'Dropdown',
  component: Dropdown,
  argTypes: {
    onChange: {
      table: {
        type: { summary: 'function' },
      },
    },
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
      trigger={<input readOnly type='text' value={selectedValue} width={100}/>}
    >
      <Dropdown.Item value='Item 1'>Item 1</Dropdown.Item>
      <Dropdown.Item value='Item 2'>Item 2</Dropdown.Item>
      <Dropdown.Item value='Item 3'>Item 3</Dropdown.Item>
      <Dropdown.Item value='Item 4'>Item 4</Dropdown.Item>
      <Dropdown.Item value='Item 5'>Item 5</Dropdown.Item>
    </Dropdown>
  );
};