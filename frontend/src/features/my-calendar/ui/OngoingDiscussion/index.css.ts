import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const titleContainerStyle = style({
  padding: `${vars.spacing[300]} ${vars.spacing[300]} ${vars.spacing[300]} ${vars.spacing[400]}`,

  borderRadius: vars.radius[300],
  backgroundColor: vars.color.Ref.Primary[50],
});

export const cardStyle = recipe({
  base: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing[300],

    padding: vars.spacing[600],

    borderRadius: vars.radius[300],
    border: `1px solid ${vars.color.Ref.Netural[100]}`,
    backgroundColor: vars.color.Ref.Netural.White,

    cursor: 'pointer',

    ':hover': {
      backgroundColor: vars.color.Ref.Netural[100],
      borderColor: vars.color.Ref.Netural[400],
    },
  },
  variants: {
    selected: {
      true: {
        backgroundColor: vars.color.Ref.Netural[100],
        borderColor: vars.color.Ref.Netural[400],
      },
    },
  },
});

export const cardTextStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing[200],
});

export const emptyTextStyle = style({
  padding: `0 ${vars.spacing[400]}`,
});