import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  width: '100vw',

  position: 'fixed',
  left: 0,
  top: 0,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 28px',
  height: 56,
  borderBottom: `1px solid ${vars.color.Ref.Netural[100]}`,
});

export const linkStyle = style({
  color: vars.color.Ref.Primary[500],
  padding: vars.spacing[400],
});
