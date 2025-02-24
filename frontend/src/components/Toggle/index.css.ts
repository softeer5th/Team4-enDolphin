import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const containerStyle = recipe({
  base: {
    width: 28,
    height: 16,

    padding: 2,

    display: 'flex',
    alignItems: 'center',
    
    borderRadius: vars.radius.Max,
    cursor: 'pointer',

    position: 'relative',
  },
  variants: {
    style: {
      rest: {
        backgroundColor: vars.color.Ref.Netural[200],
      },
      selected: {
        backgroundColor: vars.color.Ref.Primary[500],
      },
    },
  },
});

export const checkboxStyle = recipe({
  base: {
    width: 12,
    height: 12,

    backgroundColor: vars.color.Ref.Netural.White,
    borderRadius: vars.radius.Max,

    position: 'absolute',
  },
  variants: {
    style: {
      rest: {
        left: 2,
      },
      selected: {
        right: 2,
      },
    },
  },
});

export const inputStyle = style({
  display: 'none',
});