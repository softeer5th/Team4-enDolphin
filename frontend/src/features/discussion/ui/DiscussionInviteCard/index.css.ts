import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const modalContentsStyle = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const modalFooterStyle = recipe({
  base: {
    height: 'fit-content',
    display: 'flex',
    alignItems: 'center',
  },
  variants: {
    disabled: {
      true: {
        justifyContent: 'space-between',
      },
      false: {
        justifyContent: 'flex-end',
      },
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export const badgeContainerStyle = style({
  paddingTop: vars.spacing[200],
  flexWrap: 'wrap',
});

export const avatarWrapperStyle = style({
  flex: 1,
});
