import { useQuery } from '@tanstack/react-query';

import type { CandidateDetailResponse } from '../model';
import { candidateDetailQueryOption } from './queryOptions';

export const useCandidateDetailQuery = (
  discussionId: number,
  startDateTime: Date,
  endDateTime: Date,
  selectedUserIdList: number[],
) => useQuery<CandidateDetailResponse>(candidateDetailQueryOption(
  discussionId, startDateTime, endDateTime, selectedUserIdList,
));
