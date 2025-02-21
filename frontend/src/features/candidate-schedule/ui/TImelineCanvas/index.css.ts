import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const timelineCanvasStyle = style({
  position: 'static',
  width: '37.5rem',
  height: 'fit-content',
  overflowX: 'hidden',
  minHeight: '23.25rem',
});

export const timelineColumnContainerStyle = style({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  alignSelf: 'center',
});

export const timelineColumnStyle = recipe({
  base: {
    width: '2.125rem',
    height: '100%',
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
  position: 'relative',
  width: '42.5rem',
  gap: '0.53125rem',
  overflowX: 'hidden',
  flexShrink: 0,
  overflowY: 'hidden',
  minHeight: '23.25rem',
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
      ADJUSTABLE: {
        backgroundColor: vars.color.Ref.Primary[50],
        borderColor: vars.color.Ref.Primary[100],
      },
      FIXED: {
        backgroundColor: vars.color.Ref.Red[50],
        borderColor: vars.color.Ref.Red[100],
      },
      OUT_OF_RANGE: {
        backgroundColor: vars.color.Ref.Netural[100],
        borderColor: vars.color.Ref.Netural[200],
      },
    },
  },
});

export const conflictRangeTimeBlockStyle = style({
  position: 'fixed',
  height: '23.25rem',
  // maxWidth: '100%',
  borderRadius: vars.radius[400],
  border: `1px solid ${vars.color.Ref.Primary[400]}`,
  pointerEvents: 'none',
});