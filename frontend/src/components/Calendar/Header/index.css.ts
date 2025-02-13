import { style } from '@vanilla-extract/css';

import { vars } from '@/theme/index.css';

export const headerStyle = style({
  width: '100%',
  display: 'flex',
  
  borderTop: `1px solid ${vars.color.Ref.Netural[200]}`,
  borderBottom: `2px solid ${vars.color.Ref.Netural[200]}`,

  position: 'sticky',
  top: '8.375rem',
  left: 0,
  zIndex: 1,
});
  