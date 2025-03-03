import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

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
      },
      green: { 
        backgroundColor: vars.color.Ref.Green[500],
      },
      red: { 
        backgroundColor: vars.color.Ref.Red[500],
      },
      black: {
        backgroundColor: vars.color.Ref.Netural[800],
      },
      coolGray: { 
        backgroundColor: vars.color.Ref.CoolGrey[100],
        color: vars.color.Ref.Netural[600],
      },
    },
    variant: {
      borderless: { 
        backgroundColor: 'transparent', 
        color: vars.color.Ref.Netural[600],
      },
      weak: {},
      filled: {},
    },
    size: {
      sm: { minHeight: 24 },
      md: { minHeight: 28 },
      lg: { minHeight: 32 },
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
        variant: 'weak',
      },
      style: {
        backgroundColor: vars.color.Ref.Primary[50],
        color: vars.color.Ref.Primary[500],
      },
    },
    {
      variants: {
        color: 'red',
        variant: 'weak',
      },
      style: {
        backgroundColor: vars.color.Ref.Red[50],
        color: vars.color.Ref.Red[500],
      },
    },
    {
      variants: {
        color: 'green',
        variant: 'weak',
      },
      style: {
        backgroundColor: vars.color.Ref.Green[50],
        color: vars.color.Ref.Green[500],
      },
    },
    {
      variants: {
        color: 'black',
        variant: 'weak',
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
    variant: 'filled',
    radius: 'round',
    size: 'md',
  },
});