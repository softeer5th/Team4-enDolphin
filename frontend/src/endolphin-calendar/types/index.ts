export interface CalendarSharedInfo {
  selectedDate: Date;
  selectedWeek: Date[];
  handleSelectDate: (date: Date) => void;
  today: Date;
}