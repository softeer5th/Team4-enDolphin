import type { PropsWithChildren } from 'react';

import { Flex } from '../Flex';

interface ModalFooterProps extends PropsWithChildren {
  className?: string;
}

export const ModalFooter = ({ className, children }: ModalFooterProps) => (
  <Flex
    align='flex-end'
    className={className}
    height='100%'
    justify='flex-end'
    width='100%'
  >
    {children}
  </Flex>
);