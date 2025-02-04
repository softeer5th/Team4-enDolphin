import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  display: 'inline-flex',
  padding: '16px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '12px',
  borderRadius: '8px',
  border: `1px ${vars.color.Ref.Netural[100]}`,
  background: vars.color.Ref.Netural['White'],
  boxShadow: '0px 12px 32px 0px rgba(78, 89, 104, 0.02), 0px 12px 24px 0px rgba(78, 89, 104, 0.08)',
});
