import { createThemeContract, style } from '@vanilla-extract/css';

export const flexVars = createThemeContract({
  flex: {
    width: null,
    height: null,
    direction: 'row',
    justify: 'center',
    align: 'center',
    gap: null,
  },
});

export const flexStyle = style({
  display: 'flex',
  width: flexVars.flex.width,
  height: flexVars.flex.height,
  flexDirection: flexVars.flex.direction,
  justifyContent: flexVars.flex.justify,
  alignItems: flexVars.flex.align,
  gap: flexVars.flex.gap,
});