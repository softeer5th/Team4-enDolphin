import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const timelineContainerStyle = style({
  height: '28.125rem',
  // overflowX: 'hidden',
});

export const timelineCanvasWrapperStyle = style({
  width: '100%',
  height: '100%',
  overflowX: 'hidden',
  overflowY: 'scroll',
});

export const timelineHeaderStyle = style({
  marginLeft: '16.5rem',
  zIndex: 1,
  backgroundColor: vars.color.Ref.Netural['White'],
  width: '37.5rem',
  overflowX: 'hidden',
  position: 'relative',
});

export const gridTimeWrapperStyle = style({
  width: '42.5rem',
  height: '2.125rem',
  position: 'relative', 
  alignSelf: 'center',
  overflowX: 'hidden',
  overflowY: 'hidden',
});

export const gridTimeTextStyle = style({
  position: 'absolute',
  transform: 'translateX(-50%)',
  color: vars.color.Ref.Netural[500],
});

export const timelineCanvasStyle = style({
  position: 'relative',
  width: '37.5rem',
  height: 'fit-content',
  overflowX: 'hidden',
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
  // width: '100%',
  width: '42.5rem',
  gap: '0.53125rem',
  overflowX: 'hidden',
  flexShrink: 0,
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