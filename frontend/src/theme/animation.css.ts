import { keyframes, style } from '@vanilla-extract/css';

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

export const fadeInAndOut = style({
  animation: `${appear} 0.3s ease-out, ${disappear} 0.3s ease-in 2.7s`,
});
