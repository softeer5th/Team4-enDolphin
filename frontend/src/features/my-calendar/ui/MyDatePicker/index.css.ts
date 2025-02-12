import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const pickerStyle = style({
  width: `calc(17.75rem - 2 * ${vars.spacing[500]})`,
});
  