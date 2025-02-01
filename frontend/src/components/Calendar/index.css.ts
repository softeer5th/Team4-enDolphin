import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../theme/index.css';

export const wrapperStyle = style({
  width: '100%',
  display: 'flex',

  position: 'relative',
});

export const weekStyle = style({
  display: 'flex',
});

export const weekCellStyle = recipe({
  base: {
    width: '100%',
    height: 66,
    flexGrow: 1,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: vars.spacing[100],
  },
  variants: {
    day: {
      saturday: {
        color: vars.color.Ref.Primary[300],
      },
      sunday: {
        color: vars.color.Ref.Red[300],
      },
      default: {
        color: vars.color.Ref.Netural[600],
      },
    },
  },
});

export const weekCellBoxStyle = recipe({
  base: {
    width: 29,
    height: 29,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: vars.radius[200],
  },
  variants: {
    day: {
      today: {
        background: vars.gradient.gradient.blue.default,
        color: vars.color.Ref.Netural.White,
      },
      saturday: {
        color: vars.color.Ref.Primary[700],
      },
      sunday: {
        color: vars.color.Ref.Red[700],
      },
      default: {
        color: vars.color.Ref.Netural[800],
      },
    },
  },
});