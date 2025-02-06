import type { JSX, PropsWithChildren, ReactNode } from 'react';
import { isValidElement } from 'react';

import clsx from '@/utils/clsx';
import { intersperseElement } from '@/utils/jsxUtils';

import { Text } from '../Text';
import { type CommonInputProps, ICON_WIDTH } from '.';
import HelperText from './Core/HelperText';
import InputField from './Core/InputField';
import Label from './Core/Label';
import { 
  containerStyle,
  inputFieldsContainerStyle,
  interactableBorderStyle,
  separatorStyle, 
} from './index.css';
import { InputContext } from './InputContext';

export interface MultiInputProps extends CommonInputProps, PropsWithChildren {
  separator?: string | JSX.Element;
  borderPlacement?: 'container' | 'inputField';
}

export const MultiInput = ({ 
  label,
  type = 'text',
  isValid = true,
  required = false, 
  separator = '',
  hint, 
  error, 
  borderPlacement = 'inputField',
  children,
}: MultiInputProps) => {
  const childElements = children ? 
    Array.from(children as ReactNode[]).filter(isValidElement) 
    : [];
  const separatorElement = prepareSeparatorLayout(separator);
  const childrenWithSeparators =
    childElements.length > 1 ? intersperseElement(childElements, separatorElement) : childElements;

  return (
    <InputContext.Provider value={{ isValid, type, borderPlacement }}>
      <div className={containerStyle}>
        <Label required={required}>{label}</Label>
        <div className={clsx(
          inputFieldsContainerStyle,
          interactableBorderStyle({ isValid }))}
        >
          {childrenWithSeparators}
        </div>
        {isValid ? 
          <HelperText type='hint'>{hint}</HelperText>
          : 
          <HelperText type='error'>{error}</HelperText>}
      </div>
    </InputContext.Provider>
  );
};

interface SeparatorProps {
  width?: number;
  fill?: string;
}

const prepareSeparatorLayout = (separator: string | (JSX.Element & { props: SeparatorProps })) => {
  if (typeof separator === 'string') {
    return (
      <div className={separatorStyle}>
        <Text typo='b2M'>{separator}</Text>
      </div>
    );
  }
  return <separator.type {...separator.props} width={ICON_WIDTH} />;
};

MultiInput.InputField = InputField;

export default MultiInput;