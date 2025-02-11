import type { PropsWithChildren } from 'react';

import clsx from '@/utils/clsx';

import { rootContainerStyle } from './index.css';

interface RootContainerProps extends PropsWithChildren {
  className?: string;
}

const RootContainer = ({ className, children }: RootContainerProps) => (
  <div className={clsx(className, rootContainerStyle)}>
    {children}
  </div>
);

export default RootContainer;