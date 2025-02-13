import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const scheduleItemContainerStyle = recipe({ 
  base: {
    width: '100%',
    padding: `${vars.spacing[400]} ${vars.spacing[600]}`,
    borderRadius: vars.radius[500],
    cursor: 'pointer',
  },
  variants: {
    selected: {
      true: { backgroundColor: vars.color.Ref.CoolGrey[50] },
      false: {},
    },
  },
});

export const updateIndicatorStyle = recipe({
  base: {
    width: 6,
    height: 6,
    borderRadius: vars.radius['Max'],
    backgroundColor: vars.color.Ref.Primary[500],
  },
  variants: {
    isUpdated: {
      true: {},
      false: { opacity: 0 },
    },  
  },
});

export const detailsContainerStyle = style({
  paddingLeft: 14,
});

export const dotStyle = style({
  width: 8,
  height: 8,
  borderRadius: vars.radius['Max'],
  backgroundColor: vars.color.Ref.Netural[400],
});