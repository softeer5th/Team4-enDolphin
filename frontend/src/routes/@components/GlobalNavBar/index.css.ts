import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 56,
  borderBottom: `1px solid ${vars.color.Ref.Netural[100]}`,
});

export const linkStyle = style({
  color: vars.color.Ref.Primary[500],
  padding: vars.spacing[400],
});
