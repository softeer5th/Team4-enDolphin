import { useState } from 'react';

interface DateRange {
  start: Date;
  end: Date;
}

export interface DateRangeReturn {
  selectedDateRange: DateRange | null;
  handleSelectDateRange: (start: Date, end: Date) => void;
  reset: () => void;
}

export const useSelectDateRange = (): DateRangeReturn => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);

  const handleSelectDateRange = (start: Date, end: Date) => {
    setSelectedDateRange({ start, end });
  };

  const reset = () => {
    setSelectedDateRange(null);
  };

  return {
    selectedDateRange,
    handleSelectDateRange,
    reset,
  };
};