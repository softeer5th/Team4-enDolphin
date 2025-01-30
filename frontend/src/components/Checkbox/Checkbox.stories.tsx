import type { Meta, StoryObj } from '@storybook/react';

import { useGroup } from '../../hooks/useGroup';
import { Group } from '../Group';
import { Checkbox } from '.';

const meta: Meta = {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      control: { type: 'radio', options: ['sm', 'md'] },
    },
    defaultChecked: {
      control: { type: 'boolean' },
    },
    inputProps: {
      control: false,
    },
    children: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleCheck: Story = {
  args: {
    children: '라벨',
  },
};

export const GroupCheck = () => {
  type Member = {
    id: number;
    name: string;
  };

  const members: Member[] = [
    { id: 1, name: '해원' },
    { id: 2, name: '윤아' },
    { id: 3, name: '진솔' },
  ];

  const groupInfos = useGroup({
    defaultCheckedList: new Set([1, 2]),
    itemIds: members.map(({ id }) => id ),
  });
  
  return(
    <Group groupInfos={groupInfos}>
      <Checkbox type='all'>전체</Checkbox>
      {members.map(({ id, name }) => (
        <Checkbox key={id} value={id}>{name}</Checkbox>
      ))}
    </Group>
  );
};

