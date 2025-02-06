import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  padding: vars.spacing[700],
  borderBottom: `1px solid ${vars.color.Ref.Netural[100]}`,
});

