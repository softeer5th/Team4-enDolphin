import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  width: '100vw',
  maxWidth: 1288,
  minHeight: '100vh',
  overflowX: 'scroll',
  padding: `56px ${vars.spacing[700]}`,
});