import { request } from '@/utils/fetch';

import type { 
  DiscussionCalendarRequest,
  DiscussionCalendarResponse, 
  DiscussionRankRequest, 
  DiscussionRankResponse, 
  DiscussionRequest, 
  DiscussionResponse, 
} from '../model';

export const discussionApi = {
  postDiscussion: async (body: DiscussionRequest): Promise<DiscussionResponse> => {
    const response = await request.post('/api/v1/discussion', { body });
    return response;
  },
  getDiscussion: async (id: string): Promise<DiscussionResponse> => {
    const response = await request.get(`/api/v1/discussion/${id}`);
    return response;
  },
};

export const candidateApi = {
  postCalendarCandidate: async (
    discussionId: string, body: DiscussionCalendarRequest,
  ): Promise<DiscussionCalendarResponse['events']> => {
    const response 
      = await request.post(`/api/v1/discussion/${discussionId}/candidate-event/calendar`, { body });
    return response.events;
  },
  postRankCandidate: async (
    discussionId: string, body: DiscussionRankRequest,
  ): Promise<DiscussionRankResponse> => {
    const response 
      = await request.post(`/api/v1/discussion/${discussionId}/candidate-event/rank`, { body });
    return response;
  },
};