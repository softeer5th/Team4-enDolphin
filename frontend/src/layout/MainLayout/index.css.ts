import { style } from '@vanilla-extract/css';

export const containerStyle = style({
  width: '100%',
  minWidth: '1316px',
  minHeight: '100vh',
  margin: '56px 0',
  padding: '0 28px',
  display: 'flex',
  justifyContent: 'center',
});

export const contentWrapperStyle = style({  
  width: '1288px',
  minHeight: '100%',
  overflow: 'hidden',
});