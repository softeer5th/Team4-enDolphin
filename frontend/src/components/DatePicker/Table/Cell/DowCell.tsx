import type { PropsWithChildren } from 'react';

import CellWrapper from './CellWrapper';

interface DowCellProps extends PropsWithChildren {
  className: string;
}

export const DowCell = ({ className, children }: DowCellProps) => (
  <CellWrapper className={className}>
    {children}
  </CellWrapper>
);
