import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '56px',
  padding: `0px ${vars.spacing[700]}`,
  borderBottom: `1px solid ${vars.color.Ref.Netural[100]}`,
});

