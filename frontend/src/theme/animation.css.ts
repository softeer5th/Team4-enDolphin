import type { CSSProperties } from '@vanilla-extract/css';
import { keyframes, style } from '@vanilla-extract/css';

import { vars } from './index.css';

// TODO: 토큰 매직넘버 제거

const appear = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-1rem)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const disappear = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  to: {
    opacity: 0,
    transform: 'translateY(-1rem)',
  },
});

export const fadeInAndOutStyle = style({
  animation: `${appear} 0.3s ease-out, ${disappear} 0.3s ease-in 2.7s`,
});

export const fadeHighlight = keyframes({
  '0%': { backgroundColor: vars.color.Ref.Netural.White },
  '5%': { 
    backgroundColor: vars.color.Ref.Primary[50],         
    boxShadow: `inset 0 0 0 0.5px ${vars.color.Ref.Primary[100]}`, 
  },
  '50%': { 
    backgroundColor: vars.color.Ref.Primary[50],
    boxShadow: `inset 0 0 0 0.5px ${vars.color.Ref.Primary[100]}`,
  },
  '100%': { 
    backgroundColor: vars.color.Ref.Netural.White,
  },
});

export const fadeHighlightGray = keyframes({
  '0%': { backgroundColor: vars.color.Ref.Netural[50] },
  '5%': { 
    backgroundColor: vars.color.Ref.Primary[50],         
    boxShadow: `inset 0 0 0 0.5px ${vars.color.Ref.Primary[100]}`, 
  },
  '50%': { 
    backgroundColor: vars.color.Ref.Primary[50],
    boxShadow: `inset 0 0 0 0.5px ${vars.color.Ref.Primary[100]}`,
  },
  '100%': { 
    backgroundColor: vars.color.Ref.Netural[50],
  },
});

export const fadeTimeBar = keyframes({
  '0%': { opacity: 0 },
  '5%': { opacity: 1 },
  '50%': { opacity: 1 },
  '100%': {
    opacity: 0,
    display: 'none',
  },
});

export const fadeHighlightProps: CSSProperties = {
  animationName: fadeHighlight,
  animationDuration: '2s',
  animationFillMode: 'forwards',
};

export const fadeTimeBarProps: CSSProperties = {
  animationName: fadeTimeBar,
  animationDuration: '2s',
  animationFillMode: 'forwards',
};

export const fadeHighlightGrayProps: CSSProperties = {
  animationName: fadeHighlightGray,
  animationDuration: '2s',
  animationFillMode: 'forwards',
};