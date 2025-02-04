import type { JSX, PropsWithChildren, ReactNode } from 'react';
import { isValidElement } from 'react';

import { Text } from '../Text';
import { type CommonInputProps, ICON_WIDTH } from '.';
import HelperText from './HelperText';
import { containerStyle, inputFieldsContainerStyle, separatorStyle } from './index.css';
import { InputContext } from './InputContext';
import InputField from './InputField';
import Label from './Label';

export interface MultiInputProps extends CommonInputProps, PropsWithChildren {
  separator?: string | JSX.Element;
}

export const MultiInput = ({ 
  label,
  type = 'text',
  isValid = true,
  required = false, 
  separator = '',
  hint, 
  error, 
  children,
}: MultiInputProps) => {
  const childElements = children ? 
    Array.from(children as ReactNode[]).filter(isValidElement) 
    : [];
  const separatorElement = prepareSeparatorLayout(separator);
  const childrenWithSeparators =
    childElements.length > 1 ? intersperse(childElements, separatorElement) : childElements;

  return (
    <InputContext.Provider value={{ isValid, type }}>
      <div className={containerStyle}>
        <Label required={required}>{label}</Label>
        <div className={inputFieldsContainerStyle}>
          {childrenWithSeparators}
        </div>
        {isValid ? 
          <HelperText type='hint'>{hint}</HelperText>
          : 
          <HelperText type='error'>{error}</HelperText>
        }
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
  return <separator.type {...separator.props} width={ICON_WIDTH}/>;
};

const intersperse = (
  childElements: ReactNode[],
  separator?: JSX.Element,
): ReactNode[] => 
  childElements.reduce<ReactNode[]>((acc, child, index) => {
    if (separator && index < childElements.length - 1) {
      return [...acc, child, <separator.type {...separator.props} key={index} />];
    }
    return [...acc, child];
  }, []);

MultiInput.InputField = InputField;

export default MultiInput;