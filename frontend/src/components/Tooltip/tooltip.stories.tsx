import type { Meta } from '@storybook/react';

import Tooltip from '.';
 
const meta: Meta = {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    tailDirection: {
      control: {
        type: 'select',
        options: ['top', 'bottom', 'left', 'right'],
      },
    },
    color: {
      control: {
        type: 'select',
        options: ['blue', 'black'],
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

export const Primary = () => (<>
  <Tooltip color='blue' tailDirection='up'>
    Tooltip content1
  </Tooltip>
  <Tooltip color='blue' tailDirection='left'>
    Tooltip content2
  </Tooltip>
  <Tooltip color='blue' tailDirection='down'>
    Tooltip content3
  </Tooltip>
  <Tooltip color='blue' tailDirection='right'>
    Tooltip content4
  </Tooltip>
</>
);