import { style } from '@vanilla-extract/css';

import { vars } from '../../theme/index.css';

export const containerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: `${vars.spacing[200]} 0`,
});

export const inputFieldsContainerStyle = style({ 
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing[300],
});

export const separatorStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  color: vars.color.Ref.Netural[500],
});