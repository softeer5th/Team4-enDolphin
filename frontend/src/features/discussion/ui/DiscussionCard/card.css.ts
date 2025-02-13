import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const containerStyle = recipe({
  base: {
    padding: `${vars.spacing[500]} ${vars.spacing[400]}`,

    borderTopRightRadius: vars.radius[400],
    borderBottomRightRadius: vars.radius[400],
    borderLeft: '3px solid transparent',

    backgroundColor: vars.color.Ref.Netural.White,
  },
  variants: {
    isRecommend: {
      true: {
        borderImage: vars.gradient.gradient.blue.default,
        borderImageSlice: 1,
      },
      false: {
        borderImage: vars.gradient.gradient.grey.default,
        borderImageSlice: 1,
      },
    },
  },
});