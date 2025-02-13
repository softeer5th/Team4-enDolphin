import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  position: 'relative',
});

export const calendarStyle = style({
  height: 'calc(100vh - 150px)',
  paddingRight: vars.spacing[500],
});