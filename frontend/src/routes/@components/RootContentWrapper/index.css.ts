import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  margin: `0 ${vars.spacing[700]}`,
});