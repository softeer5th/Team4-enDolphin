import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  position: 'relative',
});

export const defaultWrapperStyle = recipe({
  base: {},
  variants: {
    trigger: {
      true: {
        position: 'absolute',
        left: 0,
        top: '100%',
      
        paddingBottom: vars.spacing[800],
        zIndex: 1,
      },
      false: {
        position: 'relative',
      },
    },
  },
});

export const defaultContainerStyle = style({
  padding: vars.spacing[400],
  
  width: 286,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[300],
  border: `1px ${vars.color.Ref.Netural[100]}`,
  borderRadius: vars.spacing[200],
  backgroundColor: vars.color.Ref.Netural['White'],
  boxShadow: '0px 12px 32px 0px rgba(78, 89, 104, 0.02), 0px 12px 24px 0px rgba(78, 89, 104, 0.08)',
});

export const rootContainerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[300],
});
