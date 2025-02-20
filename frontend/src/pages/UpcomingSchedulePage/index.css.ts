import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  width: 1284,
  paddingBottom: 218,

  marginTop: 80,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 32,
});

export const controlButtonStyle = recipe({
  base: {
    backgroundColor: vars.color.Ref.Netural[200],
    display: 'flex',
    width: '36px',
    height: '36px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vars.radius['Max'],
  },
  variants: {
    available: {
      true: { opacity: 1, cursor: 'pointer' },
      false: { opacity: 0.42, cursor: 'default' },
    },
  },
});

