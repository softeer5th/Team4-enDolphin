import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fadeTimeBarProps } from '@/theme/animation.css';
import { vars } from '@/theme/index.css';

export const containerStyle = recipe({
  base: {
    position: 'relative',
  },
  variants: {
    open: {
      true: {
        overflow: 'hidden',
      },
      false: {
        overflow: 'scroll',
      },
    },
  },
});

export const calendarStyle = style({
  height: 'calc(100vh - 150px)',
  paddingRight: vars.spacing[500],
});

export const timeBarWrapperStyle = style({
  paddingLeft: vars.spacing[500],
  position: 'absolute',
  alignItems: 'center',
  gap: vars.spacing[100],

  ...fadeTimeBarProps,
});

export const timeBarStyle = style({
  width: '100%',
  height: 1,
  backgroundColor: vars.color.Ref.Primary[500],
});

export const discussionBoxStyle = style({
  background: `repeating-linear-gradient(
    -45deg, ${vars.color.Ref.Netural[400]}, ${vars.color.Ref.Netural[400]} 1px, 
    ${vars.color.Ref.Netural[200]} 0, ${vars.color.Ref.Netural[200]} 10px)`,
  border: `1px solid ${vars.color.Ref.Netural[600]}`,

  opacity: 0.4,
});