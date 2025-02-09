export interface FormBaseValue {
  name: keyof MeetingFormValues;
  error?: string;
}

export interface MeetingFormValues {
  title: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  meetingTime: string;
  meetingMethod: string;
  deadline: Date;
}
