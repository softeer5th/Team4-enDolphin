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
  // 뷰포트가 충분히 넓은 경우 좌우 여백을 자동 계산
  paddingLeft: 'calc((100vw - 1284px) / 2)',
  paddingRight: 'calc((100vw - 1284px) / 2)',
  // 뷰포트가 1284px 미만이면 여백을 제거
  '@media': {
    'screen and (max-width: 1284px)': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
});

export const carouselTrackStyle = style({
  display: 'flex',
  gap: vars.spacing[600],
  transition: 'transform 0.3s ease-in-out',
});