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

export const timeBarWrapperStyle = style({
  paddingLeft: vars.spacing[500],
  position: 'absolute',
  alignItems: 'center',
  gap: vars.spacing[100],
});

export const timeBarStyle = style({
  width: '100%',
  height: 1,
  backgroundColor: vars.color.Ref.Primary[500],
});