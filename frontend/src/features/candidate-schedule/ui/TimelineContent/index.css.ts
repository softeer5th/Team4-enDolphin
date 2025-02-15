import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const containerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  position: 'relative',
  height: '28.125rem',
});

export const overlayStyle = style({
  position: 'absolute',
  left: -36,
  width: '58.5rem',
  height: 100,
  backgroundColor: vars.color.Ref.Netural[500],
  opacity: 0.5,
  pointerEvents: 'none',
});

export const bodyContainerStyle = style({
  display: 'flex',
  flexDirection: 'row',
  gap: vars.spacing[500],
  justifyContent: 'space-between',
  alignItems: 'flex-start',

  position: 'relative',
  height: '23.25rem',
  overflowX: 'hidden',
  overflowY: 'auto',
});

export const timelineHeaderStyle = style({
  marginLeft: '16.5rem',
  zIndex: 1,
  backgroundColor: vars.color.Ref.Netural['White'],
  width: '37.5rem',
  overflowX: 'hidden',
  position: 'relative',
});

export const gridTimeContainerStyle = style({
  width: '42.5rem',
  height: '2.125rem',
  position: 'relative', 
});

export const gridTimeTextStyle = style({
  position: 'absolute',
  transform: 'translateX(-50%)',  
  color: vars.color.Ref.Netural[500],
});
