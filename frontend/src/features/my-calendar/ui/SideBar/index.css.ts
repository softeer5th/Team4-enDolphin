import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const sideBarStyle = style({
  minWidth: '17.75rem',
  height: 'calc(100vh - 150px)',
  
  padding: vars.spacing[500],
  backgroundColor: vars.color.Ref.Netural[50],

  overflowY: 'scroll',

  scrollbarWidth: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
});