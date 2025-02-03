import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const dropdownContainerStyle = style({
  width: 'min-content',
  padding: 6,

  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[300],
});

export const dropdownContentStyle = style({
  width: '100%',
  padding: '0 6px',

  display: 'flex',
  flexDirection: 'column',
  
  borderRadius: 10,
  
  overflowY: 'scroll',
  '::-webkit-scrollbar': {
    width: 10,
    backgroundColor: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    width: 10,
  
    backgroundColor: vars.color.Ref.Netural[200],
    borderRadius: vars.radius.Max,
    cursor: 'pointer',
  },
});