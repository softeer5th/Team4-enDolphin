import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../theme/index.css';

export const inputFieldContainerStyle = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: vars.radius[200],
    border: `1px solid ${vars.color.Ref.Netural[300]}`,
    borderWidth: 1.5,
    backgroundColor: vars.color.Ref.Netural.White,
    padding: vars.spacing[400],
    transition: 'border-color 0.2s ease-in-out',
  },
  variants: {
    size: {
      md: { height: 40 },
    },
    state: {
      neutral: {
        ':hover': {
          borderColor: vars.color.Ref.Primary[200],
        },
        ':focus-within': {
          borderColor: vars.color.Ref.Primary[500],
        },
      },
      error: {
        borderColor: vars.color.Ref.Red[500],
      },
    },
  },
  defaultVariants: {
    size: 'md',
    state: 'neutral',
  },
});

export const inputFieldStyle = style({
  width: '100%',
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  color: vars.color.Ref.Netural[700],
  '::placeholder': {
    color: vars.color.Ref.Netural[400],
  },
});