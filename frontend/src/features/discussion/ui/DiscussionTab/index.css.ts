import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const tabContainerStyle = style({
  width: '100%',
  maxHeight: '100%',
});

export const tabListStyle = style({
  borderBottom: `1px solid ${vars.color.Ref.Netural[200]}`,
});

export const tabContentStyle = style({
  height: 'calc(100vh - 112px - 34px)',
  maxHeight: 'calc(100vh - 112px - 34px)',
  overflow: 'hidden',
});