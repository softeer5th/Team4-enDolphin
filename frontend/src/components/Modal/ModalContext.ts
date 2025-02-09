import { createContext } from 'react';

import type { ModalInfo } from '@/hooks/useModal';
import { useSafeContext } from '@/hooks/useSafeContext';
  
export const ModalContext = createContext<ModalInfo | null>(null);

export const useModalContext = () => useSafeContext(ModalContext);