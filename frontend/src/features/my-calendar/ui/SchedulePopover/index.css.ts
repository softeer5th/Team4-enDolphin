import { style } from '@vanilla-extract/css';

import { font } from '@/theme/font';
import { vars } from '@/theme/index.css';

export const containerStyle = style({
  width: 262,

  padding: vars.spacing[300],

  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing[100],

  // TODO: 아래 코드들도 토큰화
  backgroundColor: '#E5E8EB80',
  backdropFilter: 'blur(20px)',
  boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.15)',

  border: `1px solid ${vars.color.Ref.Netural[200]}`,
  borderRadius: vars.radius[500],

  position: 'absolute',
  bottom: 0,
  right: 0,
});

export const titleStyle = style({
  paddingBottom: vars.spacing[200],

  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing[100],
});

export const inputStyle = style({
  width: '100%',
  padding: `${vars.spacing[200]} 2px`,

  color: vars.color.Ref.Netural[900],
  ...font['B1 (M)'],
  borderBottom: `1px solid ${vars.color.Ref.Netural[100]}`,

  '::placeholder': {
    color: vars.color.Ref.Netural[400],
  },
});

export const cardStyle = style({
  width: '100%',
  padding: vars.spacing[300],

  backgroundColor: vars.color.Ref.Netural.White,

  borderRadius: vars.radius[300],
});

export const buttonStyle = style({
  alignSelf: 'flex-end',
  marginTop: vars.spacing[200],
});