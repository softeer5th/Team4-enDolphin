import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/theme/index.css';

export const segmentControlStyle = style({
  height: '100%',
  overflow: 'hidden',
  
  paddingTop: vars.spacing[400],
  gap: vars.spacing[500],

  justifyContent: 'flex-start',
});

export const segmentControlContentsStyle = style({
  height: '100%',
});

export const rankContainerStyle = style({
  height: '100%',
  justifyContent: 'flex-start',

  overflowY: 'scroll',
  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export const rankTopStyle = style({
  padding: vars.spacing[400],
  backgroundColor: vars.color.Ref.Netural[100],

  borderRadius: vars.radius[400],
});

export const calendarWrapperStyle = style({
  height: '100%',
  padding: `0 ${vars.spacing[300]} ${vars.spacing[100]} ${vars.spacing[200]}`,

  alignSelf: 'flex-end',
});

export const tableStyle = style({
  paddingBottom: '5rem',
});

export const tableHeaderStyle = style({
  width: '100%',

  borderBottom: `1px solid ${vars.color.Ref.Netural[200]}`,
  color: vars.color.Ref.Netural[600],
});

export const tableBodyStyle = style({
  width: '100%',
});

export const tableRowStyle = style({
  display: 'flex',
  width: '100%',
  borderBottom: `1px solid ${vars.color.Ref.Netural[200]}`,
  cursor: 'pointer',
});

export const tableHeaderCellStyle = recipe({
  base: {
    height: '100%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    padding: vars.spacing[300],

    textAlign: 'center',
  },
  variants: {
    width: {
      56: {
        flexShrink: 0,
        width: 56,
      },
      full: {
        flexGrow: 1,
      },
      158: {
        flexShrink: 0,
        width: 158,
      },
    },
  },
});

export const tableCellStyle = recipe({
  base: {
    height: '100%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    padding: `${vars.spacing[600]} ${vars.spacing[300]}`,

    textAlign: 'center',
  },
  variants: {
    width: {
      56: {
        flexShrink: 0,
        width: 56,
        backgroundColor: vars.color.Ref.Netural[50],
      },
      full: {
        flexGrow: 1,
        justifyContent: 'flex-start',
      },
      158: {
        flexShrink: 0,
        width: 158,
      },
    },
  },
});

export const tableCellTextStyle = style({
  paddingRight: '8rem',
});
