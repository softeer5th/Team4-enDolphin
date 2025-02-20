export const candidateDetailQueryKey = (
  discussionId: number, 
  startDateTime: string,
  endDateTime: string,
  selectedUserIdList: number[],
) => ['candidateDetail', discussionId, startDateTime, endDateTime, selectedUserIdList];