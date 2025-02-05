import { style } from '@vanilla-extract/css';

export const headerStyle = style({
  display: 'flex',
  paddingLeft: '8px',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
});

export const chevronWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 32,
  height: 32,
});