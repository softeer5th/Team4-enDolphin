import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  paddingBottom: vars.spacing[700],
});

export const titleStyle = style({
  paddingBottom: vars.spacing[700],
});

export const mainContainerStyle = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  gap: 44,
  paddingTop: vars.spacing[800],
});