
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { useGroup } from '@/hooks/useGroup';

import { Group } from '../Group';
import { Toggle } from '.';

const meta: Meta = {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    value: {
      control: false,
    },
    isChecked: {
      control: false,
    },
    onToggleCheck: {
      control: false,
    },
    type: {
      control: false,
    },
    defaultChecked: {
      control: false,
    },
    inputProps: {
      control: false,
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleCheck: Story = {
  args: {
    children: '라벨',
  },
};

export const ControlledCheck = () => {
  const [checked, setChecked] = useState(false);

  return(
    <Toggle isChecked={checked} onToggleCheck={setChecked} />
  );
};

export const ControlledGroupCheck = () => {
  type Member = {
    id: number;
  };

  const members: Member[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ];

  const groupInfos = useGroup({
    defaultCheckedList: new Set([1, 2]),
    itemIds: members.map(({ id }) => id ),
  });
  
  return(
    <Group groupInfos={groupInfos}>
      <Toggle type='all' />
      {members.map(({ id }) => (
        <Toggle key={id} value={id} />
      ))}
    </Group>
  );
};

