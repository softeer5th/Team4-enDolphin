import { request } from '@/utils/fetch';

import { InvitationResponseSchema } from '../model/invitation';

const ENDPOINT_PREFIX = '/api/v1/discussion';

export const invitationApi = {
  getInvitationInfo: async (discussionId: number) => {
    const response = await request.get(`${ENDPOINT_PREFIX}/${discussionId}/invite`);
    const validData = InvitationResponseSchema.parse(response);
    return validData;
  },  
};
