import { useParams } from '@tanstack/react-router';

import type { InviteResponse } from '@/features/discussion/model/invitation';
import DiscussionInviteCard from '@/features/discussion/ui/DiscussionInviteCard';

const DiscussionInvitePage = ({ invitation }: { invitation: InviteResponse }) => {
  const { id } = useParams({ from: '/_main/discussion/invite/$id' });

  const {
    host,
    title,
    dateRangeStart,
    dateRangeEnd,
    timeRangeStart,
    timeRangeEnd,
    duration,
    isFull,
    requirePassword,
  } = invitation;

  return (
    <DiscussionInviteCard 
      canJoin={!isFull}
      dateRange={{ start: dateRangeStart, end: dateRangeEnd }}
      discussionId={+id}
      hostName={host}
      meetingDuration={duration}
      requirePassword={requirePassword}
      timeRange={{ start: timeRangeStart, end: timeRangeEnd }}
      title={title}
    />
  );
};

export default DiscussionInvitePage;