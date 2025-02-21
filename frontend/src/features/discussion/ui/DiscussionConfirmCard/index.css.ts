import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const modalContainerStyle = style({
  position: 'static',
  transform: 'translate(0, 0)',
  zIndex: 0,
});

export const modalContentsStyle = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const modalFooterStyle = style({
  height: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

export const badgeContainerStyle = style({
  paddingTop: vars.spacing[200],
  flexWrap: 'wrap',
});

export const avatarWrapperStyle = style({
  flex: 1,
});
