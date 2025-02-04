import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const tabContainerStyle = style({
  display: 'flex',
  flexDirection: 'column',
});

export const tabListStyle = style({
  display: 'flex',
  gap: vars.spacing[200],
});

export const tabItemStyle = recipe({
  base: {
    padding: `0 ${vars.spacing[200]} ${vars.spacing[300]}`,

    display: 'flex',
    alignItems: 'center',
    gap: vars.spacing[300],

    cursor: 'pointer',
  },

  variants: {
    state: {
      default: {        
        color: vars.color.Ref.Netural[500],
      },
      selected: {
        color: vars.color.Ref.Netural[800],
        position: 'relative',

        ':after': {
          content: '""',
          display: 'block',
          width: '100%',
          height: '2px',
          backgroundColor: vars.color.Ref.Netural[800],

          position: 'absolute',
          bottom: 0,
          left: 0,
        },
      },
    },
  },
});

export const tabContentStyle = style({
  width: '100%',
});