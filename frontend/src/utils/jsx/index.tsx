import type { ReactNode } from '@tanstack/react-router';
import type { JSX } from 'react';

export const intersperseElement = (
  childElements: ReactNode[],
  separator?: JSX.Element,
): ReactNode[] => {
  const result: ReactNode[] = [];
  childElements.forEach((child, index) => {
    result.push(child);
    if (separator && index < childElements.length - 1) {
      result.push(<separator.type {...separator.props} key={index} />);
    }
  });
  return result;
};