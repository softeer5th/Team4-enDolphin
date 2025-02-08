import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  width: '100%',
  marginTop: 80,
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

export const CarouselStyle = style({
  width: '100%',
  display: 'flex',
  left: 0,
  gap: vars.spacing[600],
  position: 'absolute',
  top: 202,
  overflow: 'hidden',
});
