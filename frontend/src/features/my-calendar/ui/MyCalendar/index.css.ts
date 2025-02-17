import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const containerStyle = recipe({
  base: {
    position: 'relative',
  },
  variants: {
    open: {
      true: {
        overflow: 'hidden',
      },
      false: {
        overflow: 'scroll',
      },
    },
  },
});

export const calendarStyle = style({
  height: 'calc(100vh - 150px)',
  paddingRight: vars.spacing[500],
});