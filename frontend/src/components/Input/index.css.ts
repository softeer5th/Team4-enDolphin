import { style } from '@vanilla-extract/css';

import { vars } from '../../theme/index.css';

export const containerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: `${vars.spacing[200]} 0`,
});