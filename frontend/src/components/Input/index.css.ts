import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../theme/index.css';

export const containerStyle = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: vars.radius[200],
    border: `1px solid ${vars.color.Ref.Netural[300]}`,
    backgroundColor: vars.color.Ref.Netural.White,
    padding: `0 ${vars.spacing[400]}`,
    transition: 'border-color 0.2s ease-in-out',
  },
}
)

export const labelContainerStyle = recipe({
  base: {
    color: vars.color.Ref.Netural[600],
    gap: vars.spacing[50],
  }
})

export const requiredMarkerStyle = recipe({
  base: {
    height: 3,
    width: 3,
    color: vars.color.Ref.Red[500],
    borderRadius: '50%',
  }
})

export const labelStyle = recipe({ 
  base: {
    color: vars.color.Ref.Netural[600],
    marginBottom: vars.spacing[100],
  }
})

export const inputFieldStyle = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: vars.radius[200],
    border: `1px solid ${vars.color.Ref.Netural[300]}`,
    backgroundColor: vars.color.Ref.Netural.White,
    padding: `0 ${vars.spacing[200]}`,
    transition: 'border-color 0.2s ease-in-out',
    ':focus-within': {
      borderColor: vars.color.Ref.Primary[500],
    },
    ':hover': {
      borderColor: vars.color.Ref.Primary[200],
    }
  },
  variants: {
    size: {
      md: { height: 40 },
    },
    state: {
      error: {
        borderColor: vars.color.Ref.Red[500],
        ':focus-within': {
          borderColor: vars.color.Ref.Red[700],
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});