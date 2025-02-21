import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  width: 396,
  height: 552,
  flexShrink: 0,
  padding: '12px 0 28px 0',
});

export const subTextContainerStyle = style({
  paddingTop: vars.spacing[100], 
});

export const recommendContainerStyle = style({
  padding: `${vars.spacing[300]} 0`,
});

export const recommendItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: `${vars.spacing[400]} 0`,
});
