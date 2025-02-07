import { createThemeContract, style } from '@vanilla-extract/css';

export const dividerVars = createThemeContract({
  divider: {
    width: null,
    height: null,
    color: null,
  },
});

export const dividerStyle = style({
  width: dividerVars.divider.width,
  height: dividerVars.divider.height,
  background: dividerVars.divider.color,
});