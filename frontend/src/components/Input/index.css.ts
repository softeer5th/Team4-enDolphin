import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../theme/index.css';

export const containerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: `${vars.spacing[200]} 0`,
});

export const inputFieldsContainerStyle = style({ 
  display: 'flex',
  alignItems: 'center',
  height: 40,
  gap: vars.spacing[200],
  borderRadius: vars.radius[200],
  boxSizing: 'border-box',
});

export const separatorStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  color: vars.color.Ref.Netural[500],
});

export const interactableBorderStyle = recipe({
  base: {    
    border: `1px solid ${vars.color.Ref.Netural[300]}`,
    borderWidth: 1.5, 
  },
  variants: {
    isValid: {
      true: {
        ':hover': {
          borderColor: vars.color.Ref.Primary[200],
        },
        ':focus-within': {
          borderColor: vars.color.Ref.Primary[500],
        },
      },
      false: {
        borderColor: vars.color.Ref.Red[500],
      },
    },
  }, 
});