
import type { PropsWithChildren } from 'react';

import clsx from '@/utils/clsx';

import { Text } from '../../../Text';
import { cellWrapperStyle } from './index.css';

interface CellWrapperProps extends PropsWithChildren {
  cursorType: 'default' | 'pointer' | 'not-allowed';
  className?: string;
  style?: object;
  onClick?: () => void;
}
export const CellWrapper = ({ 
  className,
  cursorType, 
  style,
  onClick,
  children,
}: CellWrapperProps) => (
  <div
    className={clsx(cellWrapperStyle({ cursorType }), className )}
    onClick={onClick}
    style={style}
  >
    <Text typo='caption'>{children}</Text>
  </div>
);

export default CellWrapper;