import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const scheduleItemContainerStyle = style({ 
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[50],

  width: '100%',
  padding: `${vars.spacing[400]} 0`,
  borderRadius: vars.radius[500],
  cursor: 'pointer',
});

export const dotStyle = style({
  width: 8,
  height: 8,
  borderRadius: vars.radius['Max'],
  backgroundColor: vars.color.Ref.Netural[400],
});