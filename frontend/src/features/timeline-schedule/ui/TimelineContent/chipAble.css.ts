import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const chipAbleContainerStyle = recipe({
  base: {
    padding: `${vars.spacing[200]} ${vars.spacing[300]}`,
    borderRadius: vars.spacing[250],
    flexShrink: 0,
  },
  variants: {
    isAdjustable: {
      true: {
        backgroundColor: vars.color.Ref.Primary[50],
      },
      false: {
        backgroundColor: vars.color.Ref.Red[50],
      },
    },
  },
});

export const dotStyle = recipe({
  base: {
    width: '0.25rem',
    height: '0.25rem',
    borderRadius: vars.radius['Max'],
  },
  variants: {
    isAdjustable: {
      true: {
        backgroundColor: vars.color.Ref.Primary[500],
      },
      false: {
        backgroundColor: vars.color.Ref.Red[500],
      },
    },
  },
});
