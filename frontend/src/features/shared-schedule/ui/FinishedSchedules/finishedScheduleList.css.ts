import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const scheduleListStyle = style({
  flexDirection: 'column',
  gap: vars.spacing[600],
  height: '41.375rem',
  justifyContent: 'space-between',
  width: '100%',
  padding: `0 ${vars.spacing[600]} ${vars.spacing[600]} 0`,
});

export const paginationStyle = style({
  paddingLeft: vars.spacing[300],
});