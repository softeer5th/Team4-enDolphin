import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../../theme/index.css';

export const weekStyle = style({
  display: 'flex',
  alignItems: 'stretch',
});

export const timeControlStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing[200],
});
  
export const weekCellStyle = recipe({
  base: {
    width: '100%',
    height: 66,
  
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: vars.spacing[100],

    cursor: 'pointer',
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
    state: {
      selected: {
        backgroundColor: vars.color.Ref.Primary[50],
      },
      default: {
        backgroundColor: vars.color.Ref.Netural.White,
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