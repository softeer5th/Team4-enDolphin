import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const avatarContainerStyle = style({
  marginLeft: vars.spacing[300],
  cursor: 'pointer',
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
    padding: '0 28px 0 16px',
    height: 56,
    borderBottom: `1px solid ${vars.color.Ref.Netural[100]}`,
  
    zIndex: 1000,
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
  top: 0,
  right: 0,
  overflow: 'hidden',
});

export const nicknameModalStyle = style({
  height: 'fit-content',
});

export const nicknameTextStyle = style({
  padding: vars.spacing[400],
});

export const nicknameModalContentsStyle = style({
  paddingTop: vars.spacing[600],
});

export const logoWrapperStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${vars.spacing[300]}`,
  cursor: 'pointer',
});
