import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: vars.color.Ref.Netural[50], 
});

export const titleStyle = style({
  paddingBottom: '1.063rem',
});

export const subtitleStyle = style({
  paddingBottom: '1.438rem',
});