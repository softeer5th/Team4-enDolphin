import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const carouselStyle = style({
  position: 'absolute',
  top: 202,
  left: 0,
  width: '100%',
  minWidth: 1284,
  display: 'flex',
  gap: vars.spacing[600],
  overflow: 'hidden',
});

export const carouselTrackStyle = style({
  display: 'flex',
  gap: vars.spacing[600],
  transition: 'transform 0.3s ease-in-out',
  // 트랙은 실제로 'translateX'로 움직일 예정
});