import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const scheduleItemContainerStyle = style({ 
  width: '100%',
  padding: `${vars.spacing[400]} ${vars.spacing[600]}`,
  borderRadius: vars.radius[500],
  cursor: 'pointer',
});

export const detailsContainerStyle = style({
  paddingLeft: 14,
});

export const dotStyle = style({
  width: 8,
  height: 8,
  borderRadius: vars.radius['Max'],
  backgroundColor: vars.color.Ref.Netural[400],
});