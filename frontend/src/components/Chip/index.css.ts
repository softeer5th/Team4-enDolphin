import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../theme/index.css';

export const chipStyle = recipe({
  base: {
    width: 'fit-content',
    padding: `0 ${vars.spacing[200]}`,

    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    color: vars.color.Ref.Netural.White,
  },

  variants: {
    color: {
      blue: { 
        backgroundColor: vars.color.Ref.Primary[500],
        ':hover': {
          backgroundColor: vars.color.Ref.Primary[100],
          color: vars.color.Ref.Primary[500],
          cursor: 'pointer',
        }, 
      },
      green: { 
        backgroundColor: vars.color.Ref.Green[500],
        ':hover': {
          backgroundColor: vars.color.Ref.Green[100],
          color: vars.color.Ref.Green[500],
          cursor: 'pointer',
        }, 
      },
      red: { 
        backgroundColor: vars.color.Ref.Red[500],
        ':hover': {
          backgroundColor: vars.color.Ref.Red[100],
          color: vars.color.Ref.Red[500],
          cursor: 'pointer',
        }, 
      },
      black: {
        backgroundColor: vars.color.Ref.Netural[800],
        ':hover': {
          backgroundColor: vars.color.Ref.Netural[200],
          color: vars.color.Ref.Netural[800],
          cursor: 'pointer',
        }, 
      },
    },
    style: {
      borderness: { 
        backgroundColor: 'transparent', 
        color: vars.color.Ref.Netural[600],
        ':hover': {
          backgroundColor: vars.color.Ref.Netural[200],
          color: vars.color.Ref.Netural[800],
          cursor: 'pointer',
        }, 
      },
      weak: {},
      filled: {},
    },
    size: {
      sm: { height: 24 },
      md: { height: 28 },
      lg: { height: 32 },
    },
    radius: {
      round: { borderRadius: vars.radius[200] },
      max: { borderRadius: vars.radius.Max },
    },
  },

  compoundVariants: [
    {
      variants: {
        color: 'blue',
        style: 'weak',
      },
      style: {
        backgroundColor: vars.color.Ref.Primary[50],
        color: vars.color.Ref.Primary[500],
      },
    },
    {
      variants: {
        color: 'red',
        style: 'weak',
      },
      style: {
        backgroundColor: vars.color.Ref.Red[50],
        color: vars.color.Ref.Red[500],
      },
    },
    {
      variants: {
        color: 'green',
        style: 'weak',
      },
      style: {
        backgroundColor: vars.color.Ref.Green[50],
        color: vars.color.Ref.Green[500],
      },
    },
    {
      variants: {
        color: 'black',
        style: 'weak',
      },
      style: {
        backgroundColor: vars.color.Ref.Netural[100],
        color: vars.color.Ref.Netural[600],
      },
    },
    {
      variants: {
        size: 'lg',
        radius: 'round',
      },
      style: {
        borderRadius: vars.radius[300],
      },
    },
  ],

  defaultVariants: {
    color: 'blue',
    style: 'filled',
    radius: 'round',
    size: 'md',
  },
});