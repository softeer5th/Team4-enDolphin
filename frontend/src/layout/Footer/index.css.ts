import { style } from '@vanilla-extract/css';

export const footerContainerStyle = style({
  padding: '0.5rem 1rem',
  position: 'fixed',
  bottom: 0,
  left: 0,

  pointerEvents: 'none',
});