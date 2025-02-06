import { useState } from 'react';

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

const SegmentControl = ({
  options,
  style = 'filled',
  shadow = true,
  defaultValue = options[0]?.value ?? '',
  onChange,
}: SegmentControlProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className={segmentControlContainer({ style, shadow })}>
      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        const buttonStyles: ButtonProps = {
          variant: 'secondary',
          radius: 'max',
          size: 'lg',
          style: getButtonStyle(isSelected, style), 
        };
        return (
          <Button 
            {...buttonStyles}
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

const getButtonStyle = (isSelected: boolean, style: SegmentControlProps['style']) => {
  if (!isSelected) return 'borderless';
  if (style === 'filled') return 'filled';
  return 'weak';
};

export default SegmentControl;
