import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../../theme/index.css';

export const containerStyle = style({
  width: '100%',
  height: 784,
  
  display: 'flex',
  
  overflowY: 'scroll',
});
  
export const contentsStyle = style({
  width: '100%',
  display: 'flex',
  alignItems: 'stretch',
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
        height: 20,
      },
      default: {
        height: 66,
      },
    },
    state: {
      selected: {
        backgroundColor: vars.color.Ref.Primary[50],
        boxShadow: `inset 0 0 0 0.5px ${vars.color.Ref.Primary[100]}`,
      },
      default: {
        boxShadow: `inset 0 0 0 0.5px ${vars.color.Ref.Netural[200]}`,
      },
    },
  },
});

export const cellDetailStyle = style({
  width: '100%',
  flexGrow: 1,
  // borderBottom: '1px solid #E5E5E5',
});
  
export const sideCellStyle = recipe({
  base: {
    width: 72,
    paddingRight: vars.spacing[100],
  
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  
    backgroundColor: vars.color.Ref.Netural.White,
  },
  variants: {
    time: {
      all: {
        height: 58,
        color: vars.color.Ref.Netural[600],
      },
      empty: {
        height: 24,
        color: vars.color.Ref.Netural[500],
        marginTop: vars.spacing[500],
      },
      default: {
        height: 66,
        color: vars.color.Ref.Netural[500],
      },
    },
  },
});