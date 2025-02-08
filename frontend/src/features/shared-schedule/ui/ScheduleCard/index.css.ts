import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const containerStyle = recipe({
  base: {
    width: 358,
    height: 316,
    padding: vars.spacing[800],
    borderRadius: vars.radius[700],
  },
  variants: {
    selected: {
      true: {
        backgroundColor: vars.color.Ref.Primary[50],
      },
      false: {
        backgroundColor: vars.color.Ref.CoolGrey[50],
      },
    },
  },
});

export const chevronButtonStyle = recipe({
  base: {
    display: 'flex',
    width: '42px',
    height: '42px',
    padding: '7px',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: vars.radius['Max'],
  },
  variants: {
    selected: {
      true: {
        backgroundColor: vars.color.Ref.Primary[100],
      }, 
      false: {
        backgroundColor: vars.color.Ref.CoolGrey[100],
      },
    },
  },
});
