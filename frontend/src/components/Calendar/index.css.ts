import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../theme/index.css';

export const wrapperStyle = style({
  width: '100%',
  display: 'flex',

  position: 'relative',
});

export const containerStyle = style({
  width: '100%',
  height: 784,

  display: 'flex',

  overflowY: 'scroll',
});

export const contentsStyle = style({
  width: '100%',
  display: 'flex',
});

export const dayStyle = style({
  flexGrow: 1,
});

export const sideStyle = style({
  width: 72,
  display: 'flex',
  flexDirection: 'column',
});

export const cellStyle = recipe({
  base: {
    width: '100%',
    flexGrow: 1,
    
    borderTop: 'none',
    borderBottom: `1px solid ${vars.color.Ref.Netural[200]}`,
    borderLeft: 'none',
    borderRight: `1px solid ${vars.color.Ref.Netural[200]}`,
  },
  variants: {
    day: {
      holiday: {
        backgroundColor: vars.color.Ref.Netural[100],
      },
      default: {
        backgroundColor: vars.color.Ref.Netural.White,
      },
    },
    time: {
      all: {
        height: 58,
      },
      empty: {
        height: 74,
      },
      default: {
        height: 66,
      },
    },
  },
});

export const sideCellStyle = recipe({
  base: {
    width: 72,
    paddingRight: vars.spacing[100],

    flexShrink: 0,
    display: 'flex',
    justifyContent: 'flex-end',

    borderRight: `1px solid ${vars.color.Ref.Netural[200]}`,
    backgroundColor: vars.color.Ref.Netural.White,
  },
  variants: {
    time: {
      all: {
        height: 58,
        alignItems: 'center',
        color: vars.color.Ref.Netural[600],
      },
      empty: {
        height: 74,
        color: vars.color.Ref.Netural[500],
      },
      default: {
        height: 66,
        position: 'relative',
        color: vars.color.Ref.Netural[500],
      },
    },
  },
});