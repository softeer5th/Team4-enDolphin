import type { PropsWithChildren, RefObject } from 'react';

import clsx from '@/utils/clsx';

import { rootContainerStyle } from './index.css';

interface RootContainerProps extends PropsWithChildren {
  ref: RefObject<HTMLDivElement | null>;
  className?: string;
}

const RootContainer = ({ className, children, ref }: RootContainerProps) => (
  <div className={clsx(className, rootContainerStyle)} ref={ref}>
    {children}
  </div>
);

export default RootContainer;