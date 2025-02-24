import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';
import { fontFamilies, fontWeights } from '@/theme/typo';

export const containerStyle = style({
  width: '100vw',
  height: '100vh',
  padding: '0 1.75rem',

  background: 'linear-gradient(180deg, #B1F8FA8A 0%, #3182F610 98%)',
  overflow: 'hidden',

  '@media': {
    '(max-width: 1024px)': {
      overflowY: 'scroll',
    },
  },
});

export const titleStyle = style({
  paddingTop: '8.5rem',

  fontFamily: fontFamilies.pretendard,
  fontWeight: 700,
  fontSize: '3.25rem',
  textAlign: 'center',

  background: `linear-gradient(97deg, ${vars.color.Ref.Primary[300]} 0%, 
    ${vars.color.Ref.Primary[500]} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

export const subTitleStyle = style({
  fontFamily: fontFamilies.pretendard,
  fontWeight: fontWeights['pretendard-0'],
  fontSize: '3.25rem', 
  textAlign: 'center',

  color: vars.color.Ref.Netural[800],
});

export const descriptionStyle = style({
  paddingTop: '0.625rem',
  paddingBottom: '3.375rem',

  display: 'block',
  textAlign: 'center',
});

export const buttonStyle = style({
  justifySelf: 'center',
});

export const imageWrapperStyle = style({  
  padding: '3rem 1.75rem 0',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing[700],
    
  '@media': {
    '(max-width: 1024px)': {
      flexDirection: 'column',
      padding: '3rem 0',
    },
  },
});

export const imageStyle = style({
  width: `calc(50%-${vars.spacing[300]})`,
  maxHeight: '28rem',

  objectFit: 'cover',

  '@media': {
    '(max-width: 1024px)': {
      width: '100%',
      maxHeight: '40rem',
    },
  },
});