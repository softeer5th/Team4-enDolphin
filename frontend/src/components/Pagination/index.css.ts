import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../theme/index.css';

export const paginationContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing[300],
});

export const paginationItem = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '32px',
    height: '32px',
    color: vars.color.Ref.Netural[800],
    cursor: 'pointer',
    borderRadius: vars.radius['Max'],
    selectors: {
      '&:hover': {
        backgroundColor: vars.color.Ref.Netural[100],
      },
    },
  },
  variants: {
    active: {
      true: {
        backgroundColor: '#F3F6FC', // 토큰으로 정의되지 않음
      },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
  },
});