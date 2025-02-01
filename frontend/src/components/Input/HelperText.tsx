import type { PropsWithChildren } from 'react';

import { useSafeContext } from '../../hooks/useSafeContext';
import { Text } from '../Text';
import { helperTextStyle } from './helperText.css';
import { InputContext } from './InputContext';

interface HelperTextProps extends PropsWithChildren {
  type: 'error' | 'hint';
}

const HelperText = ({ type, children }: HelperTextProps) => (
  <p className={helperTextStyle({ type })}>
    <Text typo='b3R'>{children}</Text>
  </p>
);

const HintHelperText = ({ children }: PropsWithChildren) => {
  const { state } = useSafeContext(InputContext);
  if (state !== 'neutral') return null;

  return <HelperText type='hint'>{children}</HelperText>;
};

const ErrorHelperText = ({ children }: PropsWithChildren) => {
  const { state } = useSafeContext(InputContext);
  if (state !== 'error') return null;

  return <HelperText type='error'>{children}</HelperText>;
};

HelperText.Error = ErrorHelperText;
HelperText.Hint = HintHelperText;

export default HelperText;