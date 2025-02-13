import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const googleLoginButtonStyle = style({
  height: 40,
  padding: `0 ${vars.spacing[400]}`,
  border: `1px solid ${vars.color.Ref.Netural[400]}`,
  backgroundColor: 'rgba(255, 255, 255, 0.20)',
  borderRadius: vars.radius[200],
});

export const backdropStyle = style({
  backgroundColor: 'rgba(176, 184, 193, 0.50)',
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: 9998,
});
