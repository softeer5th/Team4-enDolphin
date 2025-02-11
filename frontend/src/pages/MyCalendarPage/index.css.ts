import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const titleContainerStyle = style({
  padding: '1.75rem',
});

export const sideBarStyle = style({
  minWidth: '17.75rem',
  padding: vars.spacing[500],
  backgroundColor: vars.color.Ref.Netural[50],
});

export const pickerStyle = style({

});

export const calendarStyle = style({
  paddingTop: vars.spacing[500],
  paddingRight: vars.spacing[500],
});