import { style } from '@vanilla-extract/css';

export const backdropStyle = style({
  backgroundColor: 'rgba(176, 184, 193, 0.50)',
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: 9998,
});
