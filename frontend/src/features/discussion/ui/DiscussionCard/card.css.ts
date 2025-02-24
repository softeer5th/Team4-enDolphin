import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const linkStyle = style({
  width: '100%',
});

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

export const largeContainerStyle = style({
  padding: vars.spacing[700],

  border: `1px solid ${vars.color.Ref.Netural[200]}`,
  borderRadius: vars.radius[500],

  backgroundColor: vars.color.Ref.Netural.White,
});

export const rankContainerStyle = recipe({
  base: {
    borderRadius: vars.radius[300],
    textAlign: 'center',
  },
  variants: {
    rank: {
      first: {
        background: vars.gradient.gradient.blue.default,
        color: vars.color.Ref.Netural.White,
      },
      default: {
        background: vars.color.Ref.Primary[50],
        color: vars.color.Ref.Primary[500],
      },
    },
  },
});

export const textStyle = style({
  display: 'flex',
  alignItems: 'center',

  gap: vars.spacing[300],
});

export const chipContainerStyle = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.spacing[200],
});