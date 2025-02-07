import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  width: '31.125rem',
  padding: vars.spacing[800],

  borderRadius: vars.spacing[800],
  background: 'linear-gradient(180deg, #FFFFFF66 0%, #FFFFFF99 46.5%, #FFFFFFCC 100%)',
});