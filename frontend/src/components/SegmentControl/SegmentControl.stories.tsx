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
    segmentOptions: [
      { label: '라벨1', value: 'value1' },
      { label: '라벨2', value: 'value2' },
      { label: '라벨3', value: 'value3' },
    ],
    defaultValue: '라벨1',
  },
};

export const WithContent = () => (
  <SegmentControl
    defaultValue='라벨1'
    segmentOptions={[
      { label: '라벨1', value: 'value1' },
      { label: '라벨2', value: 'value2' },
      { label: '라벨3', value: 'value3' },
    ]}
  >
    <SegmentControl.Content value='value1'>컨텐츠1</SegmentControl.Content>
    <SegmentControl.Content value='value2'>컨텐츠2</SegmentControl.Content>
    <SegmentControl.Content value='value3'>컨텐츠3</SegmentControl.Content>
  </SegmentControl>
);