import { createThemeContract, style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const cellThemeVars = createThemeContract({
  todayCellBackgroundColor: '--today-cell-background',
  todayCellColor: '--today-cell-color',
  selectedCellBackgroundColor: '--selected-cell-background',
  selectedCellColor: '--selected-cell-color',
});

export const calendarStyle = style({
  display: 'flex',
  height: '218px',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const rowContainerStyle = style({
  display: 'flex',
  justifyContent: 'space-around',
  padding: `${vars.spacing[100]} 0`,
});
