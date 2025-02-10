
import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const badgeStyle = style({
  border: `1px solid ${vars.color.Ref.Netural[200]}`,
  borderRadius: vars.radius['Max'],

  width: 'fit-content',
  height: 32,
  padding: `0 ${vars.spacing[300]}`,

  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
});