
import { style } from '@vanilla-extract/css';

import { vars } from '../../theme/index.css';

export const labelContainerStyle = style({
  display: 'inline-flex',
  gap: vars.spacing[50],
  color: vars.color.Ref.Netural[600],
  // alignItems: 'center',
});

export const requiredMarkerStyle = style({
  height: 3,
  width: 3,
  backgroundColor: vars.color.Ref.Red[500],
  borderRadius: '50%',
});