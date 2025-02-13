import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const backdropStyle = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,

  backgroundColor: 'rgba(0, 0, 0, 0.4)',

  zIndex: 1000,
});

export const containerStyle = style({
  position: 'fixed',
  width: '58.5rem',

  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  height: '40.5rem',

  borderRadius: vars.radius[600],
  backgroundColor: vars.color.Ref.Netural['White'],

  zIndex: 1001,
});

export const topBarStyle = style({
  width: '100%',
  padding: `${vars.spacing[600]} ${vars.spacing[900]}`,
});

export const contentContainerStyle = style({
  flex: 1,
  padding: `${vars.spacing[600]} ${vars.spacing[900]} ${vars.spacing[900]}`,
  overflowY: 'auto',
});

