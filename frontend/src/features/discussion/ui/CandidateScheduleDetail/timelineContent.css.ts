import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const timelineContainerStyle = style({
  width: '37.5rem',
  height: '28.125rem',
  overflowX: 'hidden',
  alignSelf: 'center',
});

export const timelineCanvasWrapperStyle = style({
  width: '100%',
  height: '100%',
  overflowX: 'hidden',
});

export const timelineHeaderStyle = style({
  alignSelf: 'center',
  height: 'fit-content',
  width: '42.5rem',
  zIndex: 1,
  backgroundColor: vars.color.Ref.Netural['White'],
});

export const timelineHeaderTimeTextStyle = style({
  position: 'absolute',
  color: vars.color.Ref.Netural[500],
});

export const timelineCanvasStyle = style({
  position: 'relative',
  width: '42.5rem',
});

export const timelineColumnContainerStyle = style({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
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

export const adjustRangeTimeBlockStyle = style({
  position: 'fixed',
  height: '100%',
  borderRadius: vars.radius[400],
  border: `1px solid ${vars.color.Ref.Primary[400]}`,
});