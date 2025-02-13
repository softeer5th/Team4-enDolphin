import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const checkboxContainerStyle = style({
  flexShrink: 0,
  padding: `${vars.spacing[600]} ${vars.spacing[500]}`,

  border: `1px solid ${vars.color.Ref.Netural[200]}`,
  borderRadius: vars.radius[500],
});