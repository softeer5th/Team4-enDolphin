import { request } from '@/utils/fetch';

import { CandidateDetailResponseSchema } from '../model';

// TODO: candidateApi와 통합 ? .. 합치는게 나을까 분리하는게 나을까
export const candidateDetailApi = {
  getCandidateScheduleDetail: async (
    discussionId: number,
    startDateTime: string,
    endDateTime: string,
    selectedUserIdList?: number[], 
  ) => {
    const response = await request.post(
      `/api/v1/discussion/${discussionId}/candidate-event/details`,
      { 
        body: {
          startDateTime,
          endDateTime,
          selectedUserIdList,
        },
      },
    );
    const parsedData = CandidateDetailResponseSchema.parse(response);
    return parsedData;
  },
};