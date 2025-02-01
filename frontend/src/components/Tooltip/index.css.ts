
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../theme/index.css';

export const TooltipContainerStyle = style({
  position: 'relative',
  display: 'inline-block',
});

export const TooltipContentStyle = recipe({
  base: {
    position: 'absolute',
    padding: `${vars.spacing[200]} ${vars.spacing[300]}}`,
    borderRadius: vars.radius[300],
    fontSize: '14px',
    whiteSpace: 'nowrap',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
  },
  variants: {
    arrowPlacement: {
      top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)' },
      bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)' },
      left: { right: '100%', top: '50%', transform: 'translateY(-50%)' },
      right: { left: '100%', top: '50%', transform: 'translateY(-50%)' },
    },
    color: {
      blue: {
        backgroundColor: vars.color.Ref.Primary[50],
        color: vars.color.Ref.Primary[500],
      },
      black: {
        backgroundColor: vars.color.Ref.Netural[800],
        color: vars.color.Ref.Netural.White,
      },
    },
  },
});

export const ToolTipArrowContainerStyle = style({
  position: 'absolute',
  bottom: 0,
  left: '50%',
});

export const TooltipArrow = recipe({
  base: {
    position: 'absolute',
    width: 14,
    height: 10,
    backgroundColor: 'currentColor',
    clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', // 삼각형 모양
    filter: 'blur(1px)', // ✅ 끝부분을 부드럽게 처리
  },
  variants: {
    arrowPlacement: {
      top: {
        bottom: '-10px',
        left: '50%',
        transform: 'translateX(-50%) rotate(180deg)',
      },
      bottom: {
        top: '-10px',
        left: '50%',
        transform: 'translateX(-50%)',
      },
      left: {
        right: '-10px',
        top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
      },
      right: {
        left: '-10px',
        top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
      },
    },
    color: {
      black: { backgroundColor: vars.color.Ref.Netural[500] },
      blue: { backgroundColor: vars.color.Ref.Primary[50] },
    },
  },
});
