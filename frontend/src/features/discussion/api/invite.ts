import { request } from '@/utils/fetch';

import { InviteResponseSchema } from '../model/invite';

const ENDPOINT_PREFIX = '/api/v1/discussion/';

export const inviteApi = {
  getInvitationInfo: async (discussionId: number) => {
    const response = await request.get(`${ENDPOINT_PREFIX}/${discussionId}/invite`);
    const validData = InviteResponseSchema.parse(response.data);
    return validData;
  },  
};
