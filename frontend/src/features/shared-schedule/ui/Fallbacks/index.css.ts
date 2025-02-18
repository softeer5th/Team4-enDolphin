import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  backgroundColor: vars.color.Ref.CoolGrey[50],
  borderRadius: vars.radius[700],
});