import { useState } from 'react';

export interface TimeRange {
  startTime: Date | null;
  endTime: Date | null;
}

export interface TimeInfo {
  selectedStartTime: Date | null;
  selectedEndTime: Date | null;
  handleSelectStartTime: (date: Date) => void;
  handleSelectEndTime: (date: Date) => void;
}

export const useSelectTime = (): TimeInfo => {
  const [selectedTime, setSelectedTime] = useState<TimeRange>({
    startTime: null,
    endTime: null,
  });

  const handleSelectStartTime = (date: Date) => {
    setSelectedTime((prev) => ({ ...prev, startTime: date }));
  };

  const handleSelectEndTime = (date: Date) => {
    setSelectedTime((prev) => ({ ...prev, endTime: date }));
  };

  return {
    selectedStartTime: selectedTime.startTime,
    selectedEndTime: selectedTime.endTime,
    handleSelectStartTime,
    handleSelectEndTime,
  };
};