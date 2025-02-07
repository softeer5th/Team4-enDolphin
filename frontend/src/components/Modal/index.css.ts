
import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  width: '34rem',
  height: '22.8125rem',
  padding: vars.spacing[700],
    
  borderRadius: vars.spacing[600],
  boxShadow: '0px 12px 32px 0px rgba(78, 89, 104, 0.02), 0px 12px 24px 0px rgba(78, 89, 104, 0.08)',
});

export const titleStyle = style({
  paddingTop: vars.spacing[200],
});

export const descriptionStyle = style({
  width: '100%',
  paddingTop: vars.spacing[300],
});

export const footerStyle = style({
  width: '100%',
});