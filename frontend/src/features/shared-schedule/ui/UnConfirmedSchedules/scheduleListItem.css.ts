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

export const updateIndicatorStyle = style({
  width: 6,
  height: 6,
  borderRadius: vars.radius['Max'],
  backgroundColor: vars.color.Ref.Primary[500],
});

export const detailsContainerStyle = style({
  paddingLeft: 14,
});