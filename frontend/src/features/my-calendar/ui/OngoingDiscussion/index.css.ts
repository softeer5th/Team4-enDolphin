import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const titleContainerStyle = style({
  padding: `${vars.spacing[300]} ${vars.spacing[300]} ${vars.spacing[300]} ${vars.spacing[400]}`,

  borderRadius: vars.radius[300],
  backgroundColor: vars.color.Ref.Primary[50],
});