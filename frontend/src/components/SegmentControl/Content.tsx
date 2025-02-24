import type { PropsWithChildren } from 'react';

import { useSafeContext } from '@/hooks/useSafeContext';
import clsx from '@/utils/clsx';

import { contentContainerStyle } from './index.css';
import { SegmentControlContext } from './SegmentControlContext';

interface ContentProps extends PropsWithChildren {
  value: string;
  className?: string;
}

const Content = ({ value, className, children }: ContentProps) => {
  const { selectedValue } = useSafeContext(SegmentControlContext);
  if (selectedValue !== value) return null;
  return (
    <section className={clsx(contentContainerStyle, className)}>
      {children}
    </section>
  );
};

export default Content;
