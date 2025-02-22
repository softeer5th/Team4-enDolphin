import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fadeHighlightProps } from '@/theme/animation.css';
import { vars } from '@/theme/index.css';

export const coreStyle = style({
  position: 'sticky',
  top: 0,
  left: 0,
  zIndex: 1,

  backgroundColor: vars.color.Ref.Netural.White,
});

export const weekStyle = style({
  width: '100%',
  paddingTop: vars.spacing[400],
  display: 'flex',
  alignItems: 'stretch',
});

export const timeControlStyle = recipe({
  base: { paddingTop: vars.spacing[500] },
  variants: {
    isTableUsed: {
      true: {
        paddingLeft: vars.spacing[500],
      },
      false: {
        paddingLeft: 0,
      },
    },
  },
});

export const timeControlButtonWrapperStyle = style({
  display: 'flex',
  alignItems: 'center',
});

export const timeControlButtonStyle = recipe({
  base: {
    height: 36,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    border: `1px solid ${vars.color.Ref.Netural[200]}`,
    color: vars.color.Ref.Netural[700],
  },
  variants: {
    order: {
      first: {
        padding: `0 ${vars.spacing[200]}`,
        borderRadius: `${vars.spacing[300]} 0 0 ${vars.spacing[300]}`,
      },
      mid: {
        padding: `0 ${vars.spacing[300]}`,
        borderLeft: 'none',
      },
      last: {
        padding: `0 ${vars.spacing[200]}`,
        borderLeft: 'none',
        borderRadius: `0 ${vars.spacing[300]} ${vars.spacing[300]} 0`,
      },
    },
  },
});
  
export const weekCellStyle = recipe({
  base: {
    width: '100%',
    height: 66,
  
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
    state: {
      selected: {
        backgroundColor: vars.color.Ref.Primary[50],
        ...fadeHighlightProps,
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