import { MINUTE_IN_MILLISECONDS } from '@/utils/date';

import { candidateDetailApi } from '.';
import { candidateDetailQueryKey } from './keys';

export const candidateDetailQueryOption = (
  discussionId: number,
  startDateTime: string,
  endDateTime: string,
  selectedUserIdList?: number[],
) => ({
  queryKey: candidateDetailQueryKey.detail(
    discussionId, startDateTime, endDateTime, selectedUserIdList,
  ),
  queryFn: () => candidateDetailApi.getCandidateScheduleDetail(
    discussionId, startDateTime, endDateTime, selectedUserIdList,
  ),
  cacheTime: 1 * MINUTE_IN_MILLISECONDS,
});
