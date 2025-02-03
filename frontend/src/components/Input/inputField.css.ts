import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { font } from '../../theme/font';
import { vars } from '../../theme/index.css';

export const containerStyle = recipe({
  base: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    borderRadius: vars.radius[200],
    border: `1px solid ${vars.color.Ref.Netural[300]}`,
    borderWidth: 1.5,
    backgroundColor: vars.color.Ref.Netural.White,
    padding: vars.spacing[400],
  },
  variants: {
    size: {
      md: { height: 40 },
    },
    isValid: {
      true: {
        ':hover': {
          borderColor: vars.color.Ref.Primary[200],
        },
        ':focus-within': {
          borderColor: vars.color.Ref.Primary[500],
        },
      },
      false: {
        borderColor: vars.color.Ref.Red[500],
      },
    },
  },
  defaultVariants: {
    size: 'md',
    isValid: true,
  },
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