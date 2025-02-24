import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  width: '100vw',
  height: '100vh',

  position: 'fixed',
  top: 0,
  left: 0,

  paddingTop: 56,

  overflow: 'hidden',
});

export const contentStyle = style({
  maxHeight: 'calc(100vh-150px)',
  overflow: 'hidden',
});

export const titleContainerStyle = style({
  padding: '1.75rem',
});

export const calendarStyle = style({
  height: 'calc(100vh - 150px)',
  paddingRight: vars.spacing[500],
});