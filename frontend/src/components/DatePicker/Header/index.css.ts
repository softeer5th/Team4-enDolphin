import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const headerStyle = style({
  display: 'flex',
  paddingLeft: vars.spacing[200],
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
});

export const chevronWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 32,
  height: 32,
});