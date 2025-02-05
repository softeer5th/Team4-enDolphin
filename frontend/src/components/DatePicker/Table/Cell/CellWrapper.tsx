
import type { PropsWithChildren } from 'react';

import { Text } from '../../../Text';
import { cellWrapperStyle } from './index.css';

interface CellWrapperProps extends PropsWithChildren {
  className?: string;
  style?: object;
  onClick?: () => void;
}
export const CellWrapper = ({ className, style, onClick, children }: CellWrapperProps) => (
  <div
    className={`${cellWrapperStyle} ${className}`}
    onClick={onClick}
    style={style}
  >
    <Text typo='caption'>{children}</Text>
  </div>
);

export default CellWrapper;