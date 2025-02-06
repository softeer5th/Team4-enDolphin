import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const avatarContainerStyle = style({
  display: 'flex',
  alignItems: 'center',
});

export const avatarItemStyle = recipe({
  base: {
    backgroundColor: vars.color.Ref.Netural['White'],
    borderRadius: vars.radius['Max'],
    border: `2px solid ${vars.color.Ref.Netural[100]}`,
  },
  variants: {
    size: {
      sm: { 
        width: '28px',
        height: '28px',
        selectors: {
          '&:not(:first-child)': {
            marginLeft: '-12px',
          },
          '&:(:last-child)': {
            borderColor: vars.color.Ref.Netural[500],
          },
        },
      },
      lg: { 
        width: '42px', 
        height: '42px',
        selectors: {
          '&:not(:first-child)': {
            marginLeft: '-14px',
          },
          '&:(:last-child)': {
            borderColor: vars.color.Ref.Netural[500],
          },
        },
      },
    },
  },
});
