import { request } from '@/utils/fetch';

import { InvitationJoinResponseSchema, InvitationResponseSchema } from '../model/invitation';

export const invitationApi = {
  getInvitationInfo: async (discussionId: number) => {
    const response = await request.get(`/api/v1/discussion/${discussionId}/invite`);
    const validData = InvitationResponseSchema.parse(response);
    return validData;
  },
  postInviatationJoin: async (discussionId: number, password?: string) => {
    const response = await request.post(`/api/v1/discussion/${discussionId}/join`, {
      body: { password: password }, 
    });
    const validData = InvitationJoinResponseSchema.parse(response);
    return validData;
  },
};
