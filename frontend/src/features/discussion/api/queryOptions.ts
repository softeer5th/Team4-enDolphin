import { invitationApi } from './invitationApi';
import { invitationQueryKey } from './keys';

export const invitationQueryOption = (discussionId: number) => ({
  queryKey: invitationQueryKey(discussionId),
  queryFn: () => invitationApi.getInvitationInfo(discussionId),
});
