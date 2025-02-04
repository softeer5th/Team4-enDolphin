import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const cardContainerStyle = recipe({
  base: {
    minWidth: 174,
    height: 198,
    padding: vars.spacing[200],
  },
  variants: {
    status: {
      adjustable: {
        background: vars.gradient.gradient.green.week,
      },
      fixed: {
        background: vars.gradient.gradient.red.week,
      },
    },
  },
});

export const cardBackgroundStyle = style({
  height: '100%',

  backgroundColor: vars.color.Ref.Netural.White,
  borderTopRightRadius: vars.radius[400],
  borderBottomRightRadius: vars.radius[400],
});

export const cardContentStyle = recipe({
  base: {
    padding: `${vars.spacing[300]} ${vars.spacing[400]} ${vars.spacing[100]}`,
    borderLeft: '3px solid transparent',
  },
  variants: {
    status: {
      adjustable: {
        borderImage: `${vars.gradient.gradient.green.default}`,
        borderImageSlice: 1,
      },
      fixed: {
        borderImage: `${vars.gradient.gradient.red.default}`,
        borderImageSlice: 1,
      },
    },
  },
});

export const cardBottomStyle = style({
  padding: vars.spacing[300],
});