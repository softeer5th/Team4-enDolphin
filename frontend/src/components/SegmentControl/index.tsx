import React, { useState } from 'react';

import type { ButtonProps } from '../Button';
import Button from '../Button';
import { segmentControlContainer } from './index.css';

export type SegmentOption = {
  label: string;
  value: string;
};

export interface SegmentControlProps {
  options: SegmentOption[];
  style?: 'weak' | 'filled';
  shadow?: boolean;
  defaultValue?: string;
  onChange: (value: string) => void;
};

const SegmentControl: React.FC<SegmentControlProps> = ({
  options,
  style = 'filled',
  shadow = true,
  defaultValue = options[0]?.value ?? '',
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className={segmentControlContainer({ style, shadow })}>
      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        return (
          <Button 
            {...getButtonStyles(isSelected, style)}
            key={option.value}
            onClick={() => handleSelect(option.value)} 
          >
            {option.label}
          </Button>
        ); 
      })}
    </div>
  );
};

const getButtonStyles = (isSelected: boolean, style: SegmentControlProps['style']) => {
  const buttonStyles: ButtonProps = {
    type: 'secondary',
    radius: 'max',
    size: 'lg',
  };

  if (!isSelected) {
    buttonStyles.style = 'borderless';
    return buttonStyles;
  }

  if (style === 'filled') {
    buttonStyles.style = 'filled';
    return buttonStyles;
  }
  
  buttonStyles.style = 'weak';
  return buttonStyles;
};

export default SegmentControl;
