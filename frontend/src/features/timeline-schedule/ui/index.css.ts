import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  width: '58.5rem',
  // height: '40.5rem',
  
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  borderRadius: vars.radius[600],
  backgroundColor: vars.color.Ref.Netural['White'],

  zIndex: 1001,
});

export const topBarStyle = style({
  width: '100%',
  padding: `${vars.spacing[600]} ${vars.spacing[900]}`,
  borderBottom: `1px solid ${vars.color.Ref.Netural[200]}`,
});

export const contentContainerStyle = style({
  flex: 1,
  padding: `0 ${vars.spacing[900]} ${vars.spacing[900]} ${vars.spacing[900]}`,
  overflow: 'hidden',
});

export const closeButtonStyle = style({
  marginLeft: 'auto',
});

export const headerStyle = style({
  width: '100%',
  alignSelf: 'center',
  padding: `${vars.spacing[600]} ${vars.spacing[900]} 0 ${vars.spacing[900]}`,
});