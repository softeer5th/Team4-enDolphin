import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const highlightBoxStyle = recipe({
  base: {
    padding: vars.spacing[100],
  },
  variants: {
    highlightState: {
      none: { },
      startOfRange: {
        backgroundColor: vars.color.Ref.Primary[50],
        borderTopLeftRadius: vars.radius[200],
        borderBottomLeftRadius: vars.radius[200],
      },
      inRange: {
        backgroundColor: vars.color.Ref.Primary[50],
      },
      endOfRange: {
        backgroundColor: vars.color.Ref.Primary[50],
        borderTopRightRadius: vars.radius[200],
        borderBottomRightRadius: vars.radius[200],        
      },
    },
  },
});

export const highlightGapStyle = recipe({
  base: {
    flexGrow: 1,
  },
  variants: {
    highlightState: {
      none: { },
      startOfRange: {
        backgroundColor: vars.color.Ref.Primary[50],
        borderTopLeftRadius: vars.radius[200],
        borderBottomLeftRadius: vars.radius[200],
      },
      inRange: {
        backgroundColor: vars.color.Ref.Primary[50],
      },
      endOfRange: {
        backgroundColor: vars.color.Ref.Primary[50],
        borderTopRightRadius: vars.radius[200],
        borderBottomRightRadius: vars.radius[200],
      },
    },
  }, 
});