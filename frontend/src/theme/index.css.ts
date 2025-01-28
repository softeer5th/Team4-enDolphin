
import { createGlobalTheme } from '@vanilla-extract/css';

import { color } from './color';
import { font } from './font';
import { gradient } from './gradient';
import { radius } from './radius';
import { spacing } from './spacing';

export const vars = createGlobalTheme(':root', {
  color,
  radius,
  gradient,
  spacing,
  font,
});
    