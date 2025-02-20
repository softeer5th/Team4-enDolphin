const BASE_KEY = 'candidateSchedule';

export const candidateDetailQueryKey = {
  all: [BASE_KEY],
  detail: (
    discussionId: number, 
    startDateTime: string,
    endDateTime: string,
    selectedUserIdList: number[],
  ) => [BASE_KEY, discussionId, startDateTime, endDateTime, selectedUserIdList], 
};
