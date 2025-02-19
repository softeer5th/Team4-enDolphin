export const candidateDetailQueryKey = (
  discussionId: number, 
  startDateTime: Date,
  endDateTime: Date,
  selectedUserIdList: number[],
) => ['candidateDetail', discussionId, startDateTime, endDateTime, selectedUserIdList];