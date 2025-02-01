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
        height: 20,
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