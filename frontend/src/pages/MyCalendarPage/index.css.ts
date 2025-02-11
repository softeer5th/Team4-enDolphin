import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  width: '100vw',
  height: '100vh',

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

export const sideBarStyle = style({
  minWidth: '17.75rem',
  height: 'calc(100vh - 150px)',

  padding: vars.spacing[500],
  backgroundColor: vars.color.Ref.Netural[50],
});

export const pickerStyle = style({
  width: `calc(17.75rem - 2 * ${vars.spacing[500]})`,
});

export const calendarStyle = style({
  height: 'calc(100vh - 150px)',
  paddingRight: vars.spacing[500],
});