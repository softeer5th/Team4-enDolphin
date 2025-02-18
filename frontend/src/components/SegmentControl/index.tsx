import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import { Flex } from '../Flex';
import Content from './Content';
import ControlButton from './ControlButton';
import { controlButtonContainerStyle } from './index.css';
import { SegmentControlContext } from './SegmentControlContext';

export interface SegmentOption {
  label: string;
  value: string;
}
export interface SegmentControlProps extends PropsWithChildren {
  segmentOptions: SegmentOption[];
  style?: 'weak' | 'filled';
  shadow?: boolean;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

const SegmentControl = ({
  segmentOptions,
  style = 'filled',
  shadow = true,
  defaultValue = segmentOptions[0]?.value ?? '',
  onValueChange,
  children,
  className,
}: SegmentControlProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onValueChange?.(value);
  };

  return (
    <SegmentControlContext.Provider value={{ selectedValue, handleSelect }}>
      <Flex className={className} direction='column'>
        <Flex
          as='ul'
          className={controlButtonContainerStyle({ style, shadow })}
          direction='row'
        >
          {segmentOptions.map((segmentOption, idx) => (
            <ControlButton 
              key={`${segmentOption.value}-${idx}`}
              segmentControlStyle={style}
              segmentOption={segmentOption}
            />
          ))}
        </Flex>
        {children}
      </Flex>
    </SegmentControlContext.Provider>
  );
};

SegmentControl.Content = Content;

export default SegmentControl;
