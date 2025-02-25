import { useNavigate, useParams } from '@tanstack/react-router';
import { useAtom } from 'jotai';

import type { DiscussionDTO } from '@/features/discussion/model';
import { checkboxAtom } from '@/store/discussion';

export const useNavigateToCandidate = (discussion: DiscussionDTO) => {
  const { id } = useParams({ from: '/_main/discussion/$id' });
  const [checkboxSelectedList] = useAtom(checkboxAtom);
  const navigate = useNavigate();

  const handleNavigateToCandidate = () => {
    navigate({
      params: { id: id },
      state: { candidate: {
        adjustCount: discussion.usersForAdjust.length,
        startDateTime: discussion.startDateTime,
        endDateTime: discussion.endDateTime,
        selectedParticipantIds: checkboxSelectedList ?? undefined,
      } },
      to: '/discussion/candidate/$id',
    });
  };

  return { handleNavigateToCandidate };
};