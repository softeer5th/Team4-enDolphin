import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const linkStyle = style({
  color: vars.color.Ref.Primary[500],
  padding: vars.spacing[400],
});