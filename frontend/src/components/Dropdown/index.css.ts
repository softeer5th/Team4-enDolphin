import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const dropdownContainerStyle = style({
  height: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[300],

  position: 'relative',
});

export const dropdownContentStyle = style({
  width: '100%',
  padding: '0 6px',

  display: 'flex',
  flexDirection: 'column',

  position: 'absolute',
  top: 46,
  zIndex: 1,
  
  borderRadius: 10,
  backgroundColor: vars.color.Ref.Netural.White,
  boxShadow: '0px 12px 32px 0px rgba(78, 89, 104, 0.02), 0px 12px 24px 0px rgba(78, 89, 104, 0.08)',
  
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

export const dropdownTriggerStyle = style({
  height: '100%',
});