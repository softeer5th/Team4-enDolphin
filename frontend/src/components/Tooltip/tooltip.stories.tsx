import type { Meta } from '@storybook/react';

import Tooltip from '.';
 
const meta: Meta = {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    arrowPlacement: {
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
  <Tooltip arrowPlacement='top' color='blue'>
    Tooltip content1
  </Tooltip>
  <Tooltip arrowPlacement='left' color='blue'>
    Tooltip content2
  </Tooltip>
  <Tooltip arrowPlacement='bottom' color='blue'>
    Tooltip content3
  </Tooltip>
  <Tooltip arrowPlacement='right' color='blue'>
    Tooltip content4
  </Tooltip>
</>
);