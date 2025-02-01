import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../theme/index.css';

export const ContainerStyle = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: vars.spacing[200],
    cursor: 'pointer',
  },
  variants: {
    type: {
      primary: {
        color: vars.color.Ref.Primary[500],
      },
      secondary: {
        color: vars.color.Ref.Netural[700],
      },
      destructive: {
        color: vars.color.Ref.Red[500],
      },
      re: {
        color: vars.color.Ref.Red[500],
      },
    },
    style: {
      weak: {},
      filled: {
        color: vars.color.Ref.Netural.White,
      },
      outline: {
        borderWidth: 1,
        borderStyle: 'solid',
      },
      borderless: {},
    },
    radius: {
      max: {
        borderRadius: vars.radius['Max'],
      },
      roundCorner: {
        borderRadius: vars.radius[300],
      },
    },
    size: {
      sm: {},
      md: {
        height: 36,
        padding: `0 ${vars.spacing[400]}`,
      },
      lg: {
        height: 40,
        padding: `0 ${vars.spacing[500]}`,
      },
      xl: {
        height: 48,
        padding: `0 ${vars.spacing[500]}`,
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        type: 'primary',
        style: 'filled',
      },
      style: {
        backgroundColor: vars.color.Ref.Primary[500],
      },
    },
    {
      variants: {
        type: 'primary',
        style: 'weak',
      },
      style: {
        backgroundColor: vars.color.Ref.Primary[50],
      },
    },
    {
      variants: {
        type: 'primary',
        style: 'outline',
      },
      style: {
        borderColor: vars.color.Ref.Primary[200],
      },
    },
    {
      variants: {
        type: 'secondary',
        style: 'filled',
      },
      style: {
        backgroundColor: vars.color.Ref.Netural[700],
      },
    },
    {
      variants: {
        type: 'secondary',
        style: 'weak',
      },
      style: {
        backgroundColor: vars.color.Ref.Netural[100],
      },
    },
    {
      variants: {
        type: 'secondary',
        style: 'outline',
      },
      style: {
        backgroundColor: vars.color.Ref.Netural.White,
        borderColor: vars.color.Ref.Netural[200],
      },
    },
    {
      variants: {
        type: 'secondary',
        style: 'borderless',
      },
      style: {
        color: vars.color.Ref.Netural[500],
      },
    },
    {
      variants: {
        type: 'destructive',
        style: 'filled',
      },
      style: {
        backgroundColor: vars.color.Ref.Red[500],
      },
    },
    {
      variants: {
        type: 'destructive',
        style: 'weak',
      },
      style: {
        backgroundColor: vars.color.Ref.Red[50],
      },
    },
    {
      variants: {
        type: 're',
        style: 'filled',
      },
      style: {
        backgroundColor: vars.color.Ref.Red[500],
      },
    },
    {
      variants: {
        type: 're',
        style: 'outline',
      },
      style: {
        backgroundColor: vars.color.Ref.Netural.White,
        borderColor: vars.color.Ref.Red[500],
      },
    },
    {
      variants: {
        size: 'sm',
      }, 
      style: {
        height: 18,
        gap: vars.spacing[100],
        color: vars.color.Ref.Netural[500],
        backgroundColor: 'transparent',
        border: 'none',
      },
    },
  ],
  defaultVariants: {
    type: 'primary',
    style: 'filled',
    size: 'md',
    radius: 'max',
  },
});