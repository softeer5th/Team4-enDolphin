import { style } from '@vanilla-extract/css';

export const backdropStyle = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,

  backgroundColor: 'rgba(0, 0, 0, 0.4)',

  zIndex: 1000,
});