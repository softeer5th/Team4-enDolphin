import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const buttonStyle = style({
  flexShrink: 0,
  alignSelf: 'flex-end',
});

export const datepickerStyle = style({
  width: 286,
  padding: vars.spacing[400],

  position: 'absolute',
  top: '6.5rem',

  backgroundColor: vars.color.Ref.Netural.White,
  zIndex: 1,
  border: `1px solid ${vars.color.Ref.Netural[100]}`,
  borderRadius: vars.radius[200],
  boxShadow: '0px 12px 32px 0px rgba(78, 89, 104, 0.02), 0px 12px 24px 0px rgba(78, 89, 104, 0.08)',
});