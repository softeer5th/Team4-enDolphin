import { recipe } from '@vanilla-extract/recipes';

export const ButtonIconContainerStyle = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    size: {
      sm: {
        width: 16,
        height: 16,
      },
      md: {
        width: 16,
        height: 16,
      },
      lg: {
        width: 16,
        height: 16,
      },
      xl: {
        width: 16,
        height: 16,
      },
    },
  },
});