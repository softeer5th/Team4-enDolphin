import type { PropsWithChildren } from 'react';

import { Text } from '../../Text';
import { helperTextStyle } from './helperText.css';

interface HelperTextProps extends PropsWithChildren {
  type: 'error' | 'hint';
}

const HelperTextItem = ({ type, children }: HelperTextProps) => (
  <p className={helperTextStyle({ type })}>
    <Text typo='b3R'>{children}</Text>
  </p>
);

const HelperText = (
  { isValid, hint, error }: { isValid: boolean; hint?: string; error?: string },
) => {
  if (!isValid && error) return <HelperTextItem type='error'>{error}</HelperTextItem>;
  if (hint) return <HelperTextItem type='hint'>{hint}</HelperTextItem>;
  return null;
};

export default HelperText;