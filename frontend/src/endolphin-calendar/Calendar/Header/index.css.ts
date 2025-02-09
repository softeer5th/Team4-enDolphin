import { style } from '@vanilla-extract/css';

import { vars } from '../../../theme/index.css';

export const containerStyle = style({
  width: '100%',
  display: 'flex',

  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,

  borderTop: `1px solid ${vars.color.Ref.Netural[200]}`,
  borderBottom: `2px solid ${vars.color.Ref.Netural[200]}`,
});