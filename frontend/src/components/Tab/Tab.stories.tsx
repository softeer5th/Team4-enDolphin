import type { Meta } from '@storybook/react';
import { useState } from 'react';

import { Tab } from '.';

const meta: Meta = {
  title: 'Components/Tab',
  component: Tab,
  argTypes: {
    onChange: {
      table: {
        type: { summary: 'function' },
      },
    },
    selectedValue: {
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Tab>;

export default meta;

export const Primary = () => {
  const [selectedValue, setSelectedValue] = useState('Text 1');
  const handleChange = (value: string) => setSelectedValue(value);
  
  return (
    <Tab 
      onChange={handleChange} 
      selectedValue={selectedValue} 
    >
      <Tab.List>
        <Tab.Item value='Text 1'>Text 1</Tab.Item>
        <Tab.Item value='Text 2'>Text 2</Tab.Item>
        <Tab.Item value='Text 3'>Text 3</Tab.Item>
      </Tab.List>
      <Tab.Content value='Text 1'>Content 1</Tab.Content>
      <Tab.Content value='Text 2'>Content 2</Tab.Content>
      <Tab.Content value='Text 3'>Content 3</Tab.Content>
    </Tab>
  );
};