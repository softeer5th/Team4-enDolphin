import { createContext } from 'react';

interface SegmentControlContextProps {
  selectedValue: string;
  handleSelect: (value: string) => void;
}

export const SegmentControlContext = createContext<SegmentControlContextProps | null>(null);