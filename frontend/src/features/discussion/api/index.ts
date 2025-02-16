import { request } from '@/utils/fetch';

import type { DiscussionRequest, DiscussionResponse } from '../model';

export const discussionApi = {
  postDiscussion: async (body: DiscussionRequest): Promise<DiscussionResponse> => {
    const response = await request.post('/api/v1/discussion', { body });
    return response;
  },
};