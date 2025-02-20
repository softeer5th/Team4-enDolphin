import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  width: 396,
  height: 605,
  flexShrink: 0,
  padding: '12px 0 28px 0',
});

export const subTextContainerStyle = style({
  paddingTop: vars.spacing[100], 
});
