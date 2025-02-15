import { style } from '@vanilla-extract/css';

export const pageContainerStyle = style({
  width: '100vw',
  minHeight: '100vh',

  position: 'fixed',
  top: 0,
  left: 0,
  
  background: 'linear-gradient(180deg, #B1F8FA8A 0%, #3182F610 98%)',
});