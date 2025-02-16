import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const rankContainerStyle = style({
  padding: vars.spacing[400],
  backgroundColor: vars.color.Ref.Netural[100],

  borderRadius: vars.radius[400],
});

export const calendarWrapperStyle = style({
  height: '100%',
  padding: `0 ${vars.spacing[300]} ${vars.spacing[100]} ${vars.spacing[200]}`,

  alignSelf: 'flex-end',
});