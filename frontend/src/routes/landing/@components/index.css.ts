import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';
import { fontFamilies, fontWeights } from '@/theme/typo';

export const containerStyle = style({
  width: '100vw',
  height: '100vh',

  background: 'linear-gradient(180deg, #B1F8FA8A 0%, #3182F610 98%)',
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