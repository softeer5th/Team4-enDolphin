
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const dropdownStyle = recipe({
  base: {
    width: '100%',
    height: 42,
    padding: `${vars.spacing[300]} ${vars.spacing[400]}`,

    display: 'flex',
    alignItems: 'center',

    borderRadius: vars.radius[200],
    cursor: 'pointer',

    ':hover': {
      backgroundColor: vars.color.Ref.Netural[100],
    },
  },

  variants: {
    state: {
      rest: {
        color: vars.color.Ref.Netural[700],
      },
      selected: {
        color: vars.color.Ref.Primary[500],
      },
    },
  },
});