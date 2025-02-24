import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const titleContainerStyle = style({
  padding: `${vars.spacing[300]} ${vars.spacing[300]} ${vars.spacing[300]} ${vars.spacing[400]}`,

  borderRadius: vars.radius[300],
  backgroundColor: vars.color.Ref.Primary[50],
});

export const cardStyle = style({
  padding: vars.spacing[600],

  borderRadius: vars.radius[300],
  border: `1px solid ${vars.color.Ref.Netural[100]}`,
  backgroundColor: vars.color.Ref.Netural.White,
});

export const cardTextStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing[200],
});