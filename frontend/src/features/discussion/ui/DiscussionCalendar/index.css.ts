import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fadeHighlightGrayProps } from '@/theme/animation.css';
import { vars } from '@/theme/index.css';

export const calendarTableStyle = style({
  borderBottomLeftRadius: vars.radius[600],
  borderBottomRightRadius: vars.radius[600],

  overflow: 'hidden',
});

export const dayStyle = recipe({
  base: {
    overflowY: 'scroll',
    padding: vars.spacing[200],
    flexGrow: 1,

    borderTop: `3px solid ${vars.color.Ref.Netural[200]}`,
    borderRight: `1px solid ${vars.color.Ref.Netural[200]}`,
    backgroundColor: vars.color.Ref.Netural[50],

    ':last-child': {
      borderRight: 'none',
    },

    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
  variants: {
    selected: {
      true: {
        ...fadeHighlightGrayProps,
      },
      false: {},
    },
  },
});