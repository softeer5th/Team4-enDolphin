import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

import { cellThemeVars } from '../index.css';

export const cellWrapperStyle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '24px',
  height: '24px',
  cursor: 'default',
});

export const weekdayCellStyle = style({
  color: vars.color.Ref.Netural[700],
});

export const todayCellStyle = style({
  borderRadius: vars.radius[200],
  backgroundColor: cellThemeVars.todayCellBackgroundColor,
  color: cellThemeVars.todayCellColor,
});

export const selectedCellStyle = style({
  borderRadius: vars.radius[200],
  backgroundColor: cellThemeVars.selectedCellBackgroundColor,
  color: cellThemeVars.selectedCellColor,
});

export const otherMonthCellStyle = style({
  color: vars.color.Ref.Netural[400],
});

export const saturdayCellStyle = style({
  color: vars.color.Ref.Primary[500],
});

export const holidayCellStyle = style({
  color: vars.color.Ref.Red[500],
});
