
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../theme/index.css';

export const containerStyle = recipe({
  base: {
    width: 'fit-content',
    padding: `${vars.spacing[400]} ${vars.spacing[600]} ${vars.spacing[400]} ${vars.spacing[400]}`, 
    
    display: 'flex',
    gap: vars.spacing[200],
    
    borderRadius: vars.radius[200],
  },
  variants: {
    type: {
      succes: {
        background: vars.color.Ref.Netural.White,
        border: `1px solid ${vars.color.Ref.Netural[200]}`,
      },
      error: {
        backgroundColor: vars.color.Ref.Red[50],
        border: `1px solid ${vars.color.Ref.Red[100]}`,
      },
    },
  },
});

export const contentsStyle = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing[100],
  },
  variants: {
    style: {
      default: {},
      noDescription: {
        alignSelf: 'center',
      },
    },
  },
});