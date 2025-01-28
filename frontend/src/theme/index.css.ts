
import { createGlobalTheme, globalFontFace } from '@vanilla-extract/css';

import { color } from './color';
import { gradient } from './gradient';
import { radius } from './radius';
import { spacing } from './spacing';
import { fontFamilies, fontWeights } from './typo';

export const vars = createGlobalTheme(':root', {
  color,
  radius,
  gradient,
  spacing,
});

globalFontFace(fontFamilies.pretendard, [
  {
    src: 'url(/fonts/Pretendard-SemiBold.woff2)',
    fontWeight: fontWeights['pretendard-0'],
  },
  {
    src: 'url(/fonts/Pretendard-Medium.woff2)',
    fontWeight: fontWeights['pretendard-1'],
  },
  {
    src: 'url(/fonts/Pretendard-Regular.woff2)',
    fontWeight: fontWeights['pretendard-2'],
  },
  {
    src: 'url(/fonts/Pretendard-Light.woff2)',
    fontWeight: fontWeights['pretendard-3'],
  },
]);