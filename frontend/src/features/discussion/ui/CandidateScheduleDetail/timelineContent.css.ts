import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const timelineCanvasWrapperStyle = style({
  alignSelf: 'center',
  width: '37.5rem',
  height: '100%',
  overflowY: 'scroll',
  overflowX: 'hidden',
});

export const timelineCanvasStyle = style({
  position: 'relative',
  alignSelf: 'center',
  width: 'fit-content',
});

export const timelineColumnStyle = recipe({
  base: {
    width: '2.125rem',
    height: 400,
    borderRight: `1px solid ${vars.color.Ref.Netural[300]}`,
    flexShrink: 0,
  },
  variants: {
    isInRange: {
      true: {
        backgroundColor: vars.color.Ref.Netural['White'],
      },
      false: {
        backgroundColor: vars.color.Ref.Netural[50],
      },
    },
  },
});

export const timelineBlockContainerStyle = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  gap: '0.53125rem',
});

export const timelineBlockRowStyle = style({
  position: 'relative',
  width: '100%',
  height: '4.25rem',
});

export const timelineBlockStyle = recipe({
  base: {
    position: 'absolute',
    top: 0,
    height: '100%',
    backgroundColor: vars.color.Ref.Netural[500],
    borderRadius: vars.radius[300],
    border: '1px solid',
  },
  variants: {
    status: {
      adjustable: {
        backgroundColor: vars.color.Ref.Primary[50],
        borderColor: vars.color.Ref.Primary[100],
      },
      fixed: {
        backgroundColor: vars.color.Ref.Red[50],
        borderColor: vars.color.Ref.Red[100],
      },
      notInRange: {
        backgroundColor: vars.color.Ref.Netural[100],
        borderColor: vars.color.Ref.Netural[200],
      },
    },
  },
});
