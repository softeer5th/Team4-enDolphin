import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const tabContainerStyle = style({
  width: '100%',
});

export const tabListStyle = style({
  borderBottom: `1px solid ${vars.color.Ref.Netural[200]}`,
});