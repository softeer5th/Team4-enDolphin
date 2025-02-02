import type { JSX, PropsWithChildren, ReactNode } from 'react';
import { Children, cloneElement } from 'react';

import { Text } from '../Text';
import HelperText from './HelperText';
import { containerStyle, inputFieldsContainerStyle, separatorStyle } from './index.css';
import { InputContext } from './InputContext';
import InputField from './InputField';
import Label from './Label';

const ICON_WIDTH = 20;

export interface InputProps extends PropsWithChildren {
  state: 'neutral' | 'error';
  label: string;
  required?: boolean;
  separator?: string | JSX.Element;
  hint?: string;
  error?: string;
}

export const Input = ({ 
  state, 
  label, 
  hint, 
  error, 
  required = false, 
  separator = '',
  children,
}: InputProps) => {
  const childElements = Children.toArray(children);
  const separatorElement = prepareSeparator(separator);
  const childrenWithSeparators =
    childElements.length > 1 ? intersperse(childElements, separatorElement) : childElements;

  return (
    <InputContext.Provider value={{ state }}>
      <div className={containerStyle}>
        <Label required={required}>{label}</Label>
        <div className={inputFieldsContainerStyle}>
          {childrenWithSeparators}
        </div>
        {state === 'error' ? 
          <HelperText type='error'>{error}</HelperText>
          : 
          <HelperText type='hint'>{hint}</HelperText>
        }
      </div>
    </InputContext.Provider>
  );
};

const prepareSeparator = (separator: string | JSX.Element) => {
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
      return [...acc, child, cloneElement(separator, { key: `separator-${index}` })];
    }
    return [...acc, child];
  }, []);
  
Input.InputField = InputField;

export default Input;