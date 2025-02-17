import type { Meta, StoryObj } from '@storybook/react';

import SegmentControl from './index';

const meta: Meta<typeof SegmentControl> = {
  title: 'Components/SegmentControl',
  component: SegmentControl,
  argTypes: {
    defaultValue: {
      control: 'text',
    },
    shadow: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof SegmentControl>;

export default meta;

export const Default: StoryObj<typeof SegmentControl> = {
  args: {
    values: ['라벨1', '라벨2', '라벨3'],
    defaultValue: '라벨1',
  },
};

export const WithContent = () => (
  <SegmentControl defaultValue='라벨1' values={['라벨1', '라벨2', '라벨3']}>
    <SegmentControl.Content value='라벨1'>컨텐츠1</SegmentControl.Content>
    <SegmentControl.Content value='라벨2'>컨텐츠2</SegmentControl.Content>
    <SegmentControl.Content value='라벨3'>컨텐츠3</SegmentControl.Content>
  </SegmentControl>
);