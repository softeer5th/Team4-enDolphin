import { useQuery } from '@tanstack/react-query';

import type { CandidateDetailResponse } from '../model';
import { candidateDetailQueryOption } from './queryOptions';

export const useCandidateDetailQuery = (
  discussionId: number,
  startDateTime: string,
  endDateTime: string,
  selectedUserIdList?: number[],
) => useQuery<CandidateDetailResponse>(candidateDetailQueryOption(
  discussionId, startDateTime, endDateTime, selectedUserIdList,
));
