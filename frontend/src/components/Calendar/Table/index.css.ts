import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fadeHighlightProps } from '@/theme/animation.css';

import { vars } from '../../../theme/index.css';

export const containerStyle = style({
  width: '100%',
  display: 'flex',
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
    boxShadow: `inset 0 0 0 0.5px ${vars.color.Ref.Netural[200]}`,
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
        height: 16,
      },
      default: {
        height: 66,
      },
    },
    state: {
      selected: {
        backgroundColor: vars.color.Ref.Primary[50],
        ...fadeHighlightProps,
      },
      default: {},
    },
  },
});

export const cellDetailStyle = recipe({
  base: {
    width: '100%',
    flexGrow: 1,
    cursor: 'pointer',
  },
  variants: {
    state: {
      selected: {
        backgroundColor: vars.color.Ref.Primary[50],
        boxShadow: `inset 0 0 0 0.5px ${vars.color.Ref.Primary[100]}`,
      },
      done: {
        backgroundColor: vars.color.Ref.Primary[50],
      },
      default: {},
    },
  },
});
  
export const sideCellStyle = recipe({
  base: {
    width: 72,
    paddingTop: vars.spacing[200],
    paddingRight: vars.spacing[100],
  
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'flex-end',
  
    backgroundColor: vars.color.Ref.Netural.White,

    userSelect: 'none',
    WebkitUserSelect: 'none',
  },
  variants: {
    time: {
      all: {
        height: 58,
        paddingTop: 0,
        alignItems: 'center',
        color: vars.color.Ref.Netural[600],
      },
      empty: {
        height: 20,
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