import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  padding: `0 ${vars.spacing[700]}`,
  minWidth: 1288,
});