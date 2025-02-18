import { inviteApi } from './invite';
import { invitationQueryKey } from './keys';

export const invitationQueryOption = (discussionId: number) => ({
  queryKey: invitationQueryKey(discussionId),
  queryFn: () => inviteApi.getInvitationInfo(discussionId),
});
