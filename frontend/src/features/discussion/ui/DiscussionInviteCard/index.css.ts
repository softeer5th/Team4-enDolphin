import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { font } from '@/theme/font';
import { vars } from '@/theme/index.css';

export const modalContentsStyle = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const modalFooterStyle = recipe({
  base: {
    height: 'fit-content',
    display: 'flex',
    alignItems: 'center',
  },
  variants: {
    disabled: {
      true: {
        justifyContent: 'space-between',
      },
      false: {
        justifyContent: 'flex-end',
      },
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export const badgeContainerStyle = style({
  paddingTop: vars.spacing[200],
  flexWrap: 'wrap',
});

export const avatarWrapperStyle = style({
  flex: 1,
});

export const inputStyle = style({
  display: 'flex',
  height: '3rem',
  padding: `0 ${vars.spacing[400]}`,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  borderRadius: '8px',
  border: `1px solid ${vars.color.Ref.Netural[200]}`,
  '::placeholder': {
    color: vars.color.Ref.Netural[400],
    fontFamily: font['B3 (M)'].fontFamily,
    fontSize: font['B3 (M)'].fontSize,
    fontWeight: font['B3 (M)'].fontWeight,
  },
});