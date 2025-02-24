
import { recipe } from '@vanilla-extract/recipes';

export const containerStyle = recipe({
  base: {
    width: 'fit-content',
    height: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    zIndex: 100,
  },
  variants: {
    tailDirection: {
      up: { flexDirection: 'column' },
      down: { flexDirection: 'column' },
      left: { flexDirection: 'row' },
      right: { flexDirection: 'row' },
    },
  },
});

export const tooltipArrowStyle = recipe({
  base: {},
  variants: {
    tailDirection: {
      up: { transform: 'rotate(180def)' },
      down: { },
      left: { },
      right: { transform: 'rotate(180deg)' },
    },
  },
});