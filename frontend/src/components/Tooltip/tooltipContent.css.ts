import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../theme/index.css';

export const contentContainerStyle = recipe({
  base: {
    borderRadius: 10,
    fontSize: '14px',
    whiteSpace: 'nowrap',
    display: 'flex',
    flexDirection: 'column',
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
    buttonExists: {
      true: {
        padding: vars.spacing[400],
        gap: vars.spacing[300],
      },
      false: {
        padding: `${vars.spacing[200]} ${vars.spacing[300]}`,
      },
    },
  },
});

export const tooltipButtonStyle = style({
  alignSelf: 'flex-end',
});