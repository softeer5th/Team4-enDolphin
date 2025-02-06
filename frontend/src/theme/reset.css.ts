import { globalStyle } from '@vanilla-extract/css';

globalStyle(
  '*:where(:not(html, iframe, canvas, img, svg, video, audio):not(svg *, symbol *))',
  {
    '@layer': {
      reset: {
        all: 'unset',
        display: 'revert',
      },
    },
  },
);

globalStyle('*, *::before, *::after', {
  '@layer': {
    reset: {
      boxSizing: 'border-box',
    },
  },
});

globalStyle('html, body, #root, #page', {
  '@layer': {
    reset: {
      width: '100vw',
      height: '100vh',

      position: 'fixed',
      left: 0,
      top: 0,
    },
  },
});

globalStyle('a, button', {
  '@layer': {
    reset: {
      cursor: 'pointer',
    },
  },
});

globalStyle('ol, ul, menu, summary', {
  '@layer': {
    reset: {
      listStyle: 'none',
    },
  },
});

globalStyle('table', {
  '@layer': {
    reset: {
      borderCollapse: 'collapse',
    },
  },
});

globalStyle('textarea', {
  '@layer': {
    reset: {
      whiteSpace: 'revert',
    },
  },
});

globalStyle(':where(pre)', {
  '@layer': {
    reset: {
      all: 'revert',
      boxSizing: 'border-box',
    },
  },
});

globalStyle('::placeholder', {
  '@layer': {
    reset: {
      color: 'unset',
    },
  },
});

globalStyle(':where([hidden])', {
  '@layer': {
    reset: {
      display: 'none',
    },
  },
});

globalStyle(':where([draggable="true"])', {
  '@layer': {
    reset: {
      // @ts-expect-error: -webkit-user-drag is a non-standard property
      WebkitUserDrag: 'element',
    },
  },
});

globalStyle(':where(dialog:modal)', {
  '@layer': {
    reset: {
      all: 'revert',
      boxSizing: 'border-box',
    },
  },
});