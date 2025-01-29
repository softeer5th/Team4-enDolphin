import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../theme/index.css';

export const containerStyle = style({
  width: 'fit-content',

  display: 'flex',
  alignItems: 'center',
    
  cursor: 'pointer',
});

export const checkboxStyle = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    border: `2px solid ${vars.color.Ref.Netural[300]}`,
  },
  variants: {
    size: {
      sm: {
        width: 12,
        height: 12,
        borderRadius: 6,
      },
      md: {
        width: 16,
        height: 16,
        borderRadius: vars.radius[200],
      },
    },
    style: {
      rest: {
        backgroundColor: 'transparent',
        selectors: {
          [`${containerStyle}:hover &`]: {
            backgroundColor: vars.color.Ref.Primary[50],
            borderColor: vars.color.Ref.Primary[200],
          },
        },
      },
      selected: {
        backgroundColor: vars.color.Ref.Primary[500],
        borderColor: vars.color.Ref.Primary[500],
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

export const labelStyle = recipe({
  base: { cursor: 'pointer' },

  variants: {
    size: {
      sm: {
        paddingLeft: vars.spacing[100],
      },
      md: {
        paddingLeft: vars.spacing[300],
      }, 
    },
    style: {
      rest: {
        color: vars.color.Ref.Netural[700],
      },
      selected: {
        color: vars.color.Ref.Primary[500],
      },
    },
  },
});

export const inputStyle = style({
  display: 'none',
});