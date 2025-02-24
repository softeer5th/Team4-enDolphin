import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const helperTextStyle = recipe({
  base: {},
  variants: {
    type: {
      hint: {
        color: vars.color.Ref.Primary[500],
      },
      error: {
        color: vars.color.Ref.Red[500],
      },
    },
  },
  defaultVariants: {
    type: 'hint',
  },
});
  