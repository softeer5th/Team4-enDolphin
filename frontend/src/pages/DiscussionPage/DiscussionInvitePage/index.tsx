import { useInviteInfoQuery } from '@/features/discussion/api/queries';
import DiscussionInviteCard from '@/features/discussion/ui/DiscussionInviteCard';

const DiscussionInvitePage = ({ discussionId }:
{ discussionId: number },
) => {
  const { data, isPending } = useInviteInfoQuery(discussionId);

  if (isPending) return <div>Loading...</div>;
  if (!data) return <div>response contains no data</div>;
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
  } = data;

  return (
    <DiscussionInviteCard 
      canJoin={!isFull}
      dateRange={{ start: dateRangeStart, end: dateRangeEnd }}
      discussionId={discussionId}
      hostName={host}
      meetingDuration={duration}
      requirePassword={requirePassword}
      timeRange={{ start: timeRangeStart, end: timeRangeEnd }}
      title={title}
    />
  );
};

export default DiscussionInvitePage;