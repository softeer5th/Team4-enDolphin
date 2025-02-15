import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const participantsContainerStyle = style({
  width: '15rem',
});

export const participantItemStyle = style({
  height: '4.25rem',
  width: '100%',
  // padding: vars.spacing[600],
  paddingRight: '1.0625rem',
  backgroundColor: vars.color.Ref.Netural[50],
  gap: '1.875rem',
});

export const profileContainerStyle = style({
});