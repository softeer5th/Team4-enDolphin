import { style } from '@vanilla-extract/css';

export const wrapperStyle = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',

  position: 'relative',
});

export const calendarStyle = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',

  overflowY: 'scroll',
});