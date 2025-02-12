import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const cardContainerStyle = recipe({
  base: {
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
    size: {
      sm: {
        padding: 0,
      },
      md: {},
      lg: {},
    },
  },
});

export const cardBackgroundStyle = recipe({
  base: {
    maxWidth: '100%',
    height: '100%',

    backgroundColor: vars.color.Ref.Netural.White,
    borderTopRightRadius: vars.radius[400],
    borderBottomRightRadius: vars.radius[400],
  },
  variants: {
    size: {
      sm: {
        borderRadius: 0,
      },
      md: {},
      lg: {},
    },
  },
});

export const cardContentStyle = recipe({
  base: {
    width: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    padding: `${vars.spacing[200]} ${vars.spacing[400]} ${vars.spacing[100]}`,
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
    size: {
      sm: {},
      md: {
        padding: `${vars.spacing[100]} ${vars.spacing[200]}`,
      },
      lg: {},
    },
  },
});

export const cardTextStyle = style({
  minWidth: 0,
  maxWidth: '100%',
});

export const cardTitleStyle = recipe({
  base: {
    display: 'inline-block',
    minWidth: 0,
  },
  variants: {
    size: {
      sm: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      md: {
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      lg: {},
    },
  },
});

export const cardBottomStyle = style({
  padding: vars.spacing[300],
});