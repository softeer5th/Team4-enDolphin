import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const avatarContainerStyle = style({
  marginLeft: vars.spacing[300],
});

export const containerStyle = recipe({
  base: {
    width: '100vw',

    position: 'fixed',
    left: 0,
    top: 0,
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 28px',
    height: 56,
    borderBottom: `1px solid ${vars.color.Ref.Netural[100]}`,
  
    zIndex: 1000,

    cursor: 'pointer',
  },
  variants: {
    background: {
      white: {
        backgroundColor: vars.color.Ref.Netural['White'],
      },
      transparent: {
        backgroundColor: 'transparent',
      },
    },
  },
});

export const linkStyle = style({
  color: vars.color.Ref.Primary[500],
  padding: vars.spacing[400],
});

export const dropdownContentsStyle = style({
  top: '3.5rem',
  right: 0,

  overflow: 'hidden',
});