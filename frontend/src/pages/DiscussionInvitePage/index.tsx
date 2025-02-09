import DiscussionInviteCard from '@/features/discussion/ui/DiscussionInviteCard';

const DiscussionInvitePage = () => {
  const dummyData = {
    hostName: '김기업',
    dateRange: { start: new Date(), end: new Date() },
    timeRange: { start: new Date(), end: new Date() },
    meetingDuration: 60,
    participantImageUrls: ['hi.com'],
    location: '서울시 강남구 역삼동 123-45',
    canJoin: false,
  };

  return <DiscussionInviteCard {...dummyData} />;
};

export default DiscussionInvitePage;