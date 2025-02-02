
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../theme/index.css';

export const tooltipContainerStyle = recipe({
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

export const tooltipContentStyle = recipe({
  base: {
    padding: `${vars.spacing[200]} ${vars.spacing[300]}`,
    borderRadius: 10,
    fontSize: '14px',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  variants: {
    color: {
      blue: {
        backgroundColor: vars.color.Ref.Primary[50],
        color: vars.color.Ref.Primary[500],
      },
      black: {
        backgroundColor: vars.color.Ref.Netural[800],
        color: vars.color.Ref.Netural.White,
      },
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