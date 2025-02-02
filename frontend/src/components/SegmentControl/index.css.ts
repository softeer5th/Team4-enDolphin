import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../theme/index.css';

export const segmentControlContainer = recipe({
  base: {
    display: 'inline-flex',
    borderRadius: vars.radius[600],
    padding: '4px',
  },
  variants: {
    style: {
      filled: {
        backgroundColor: vars.color.Ref.CoolGrey[50],
      },
      weak: {
        backgroundColor: vars.color.Ref.Netural['White'],
      },
    },
    shadow: {
      true: { boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.03)' }, 
      false: {},
    },
  },
});