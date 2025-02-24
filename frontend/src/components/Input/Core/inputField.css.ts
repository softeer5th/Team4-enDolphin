import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { font } from '@/theme/font';
import { vars } from '@/theme/index.css';

export const inputFieldContainerStyle = recipe({
  base: {
    flex: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: vars.color.Ref.Netural.White,
    padding: `0 ${vars.spacing[400]}`,
    borderRadius: vars.radius[200],
    borderWidth: 1.5,
    boxSizing: 'border-box',
  },
  variants: {
    type: {
      text: { cursor: 'text' },
      select: { cursor: 'pointer' },
    },
  },
});

export const selectIconStyle = style({
  width: '20px',
  height: '20px',
});

const inputTypo = font['B3 (R)'];
export const inputFieldStyle = style({
  width: '100%',
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  color: vars.color.Ref.Netural[700],
  ...inputTypo,
  '::placeholder': {
    color: vars.color.Ref.Netural[400],
  },
});