
import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  width: '34rem',
  height: '22.8125rem',
  padding: vars.spacing[700],

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
    
  borderRadius: vars.spacing[600],
  boxShadow: '0px 12px 32px 0px rgba(78, 89, 104, 0.02), 0px 12px 24px 0px rgba(78, 89, 104, 0.08)',
  backgroundColor: vars.color.Ref.Netural.White,

  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 9999,
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

export const backdropStyle = style({
  backgroundColor: '#B0B8C180',

  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,

  zIndex: 9998,
});