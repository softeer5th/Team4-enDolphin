import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import { Flex } from '../Flex';
import Content from './Content';
import ControlButton from './ControlButton';
import { controlButtonContainerStyle } from './index.css';
import { SegmentControlContext } from './SegmentControlContext';

export interface SegmentControlProps extends PropsWithChildren {
  values: string[];
  style?: 'weak' | 'filled';
  shadow?: boolean;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

const SegmentControl = ({
  values,
  style = 'filled',
  shadow = true,
  defaultValue = values[0] ?? '',
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
          {values.map((value, idx) => (
            <ControlButton
              key={`${value}-${idx}`}
              segmentControlStyle={style}
              value={value}
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
