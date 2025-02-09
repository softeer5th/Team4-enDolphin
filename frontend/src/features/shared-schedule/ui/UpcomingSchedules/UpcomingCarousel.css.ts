import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const carouselStyle = style({
  position: 'absolute',
  top: 202,
  left: 0,
  width: '100%',
  display: 'flex',
  gap: vars.spacing[600],
  overflow: 'hidden',
});