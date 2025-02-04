import type { PropsWithChildren } from 'react';

import { Text } from '../Text';
import { helperTextStyle } from './helperText.css';

interface HelperTextProps extends PropsWithChildren {
  type: 'error' | 'hint';
}

const HelperText = ({ type, children }: HelperTextProps) => (
  <p className={helperTextStyle({ type })}>
    <Text typo='b3R'>{children}</Text>
  </p>
);

export default HelperText;