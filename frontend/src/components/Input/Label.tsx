import type { PropsWithChildren } from 'react';

import { Text } from '../Text';
import { labelContainerStyle, requiredMarkerStyle } from './label.css';

interface LabelProps extends PropsWithChildren {
  required: boolean;
}

const Label = ({ required, children }: LabelProps) => 
  (
    // TODO: label에 htmlFor 속성 주입
    <label className={labelContainerStyle}>
      <Text typo='b3R'>{children}</Text> 
      {required && <div className={requiredMarkerStyle} />}
    </label>
  )
;

export default Label;