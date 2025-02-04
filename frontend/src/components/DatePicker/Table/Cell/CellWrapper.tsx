
import type { PropsWithChildren } from 'react';

import { Text } from '../../../Text';
import { cellWrapperStyle } from './index.css';

interface CellWrapperProps extends PropsWithChildren {
  className?: string;
  style?: object;
}
const CellWrapper = ({ className, style, children }: CellWrapperProps) => (
  <div
    className={`${cellWrapperStyle} ${className}`}
    style={style}
  >
    <Text typo='caption'>{children}</Text>
  </div>
);

export default CellWrapper;
