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
    options: [
      { label: '라벨1', value: 'label1' },
      { label: '라벨2', value: 'label2' },
      { label: '라벨3', value: 'label3' },
    ],
    defaultValue: 'label1',
    onChange: () => { /* do nothing */ },
  },
};