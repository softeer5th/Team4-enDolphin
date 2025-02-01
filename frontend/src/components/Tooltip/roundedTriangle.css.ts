// RoundedTriangle.tsx
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../theme/index.css';

const triangleSize = 10;
const triangleRadius = 4;

export const triangleContainer = recipe({
  base: {
    position: 'relative',
    width: `${triangleSize}px`,
    height: `${triangleSize}px`,
  },
  variants: {
    direction: {
      top: { transform: 'rotate(0deg)' },
      bottom: { transform: 'rotate(180deg)' },
      left: { transform: 'rotate(-90deg)' },
      right: { transform: 'rotate(90deg)' },
    },
  },
  defaultVariants: {
    direction: 'top',
  },
});

export const trianglePart = recipe({ 
  base: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  variants: {
    color: {
      blue: { backgroundColor: vars.color.Ref.Primary[50] },
      black: { backgroundColor: vars.color.Ref.Netural[800] },
    },
  },
});

// 평핸사변형 3개를 조합하여 둥근 삼각형을 생성해냄
export const upperTriangle = style({
  borderTopRightRadius: `${triangleRadius}px`,
  transform: 'rotate(-60deg) skewX(-30deg) scaleY(0.866)',
});

export const lowerTriangle = style({
  borderTopRightRadius: `${triangleRadius}px`,
  transform: `rotate(-180deg) skewX(-30deg) scaleY(0.866) translateY(-${triangleSize / 2}px)`,
});

export const bottomRightTriangle = style({
  borderTopLeftRadius: `${triangleRadius}px`,
  transform: `rotate(180deg) skewX(30deg) scaleY(0.866) translateY(-${triangleSize / 2}px)`,
});
