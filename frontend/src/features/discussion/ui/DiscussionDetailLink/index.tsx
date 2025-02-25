import { createLink, useParams } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import type { PropsWithChildren } from 'react';

import { checkboxAtom } from '@/store/discussion';

import type { DiscussionDTO } from '../../model';
import { trLinkStyle } from './index.css';

interface DiscussionDetailLinkProps
  extends PropsWithChildren {
  asTr: boolean;
  discussion: DiscussionDTO;
}
const DiscussionDetailLink = ({
  asTr,
  discussion,
  children,
}: DiscussionDetailLinkProps) => {
  const { id } = useParams({ from: '/_main/discussion/$id' });
  const [checkboxSelectedList] = useAtom(checkboxAtom);
  const TrLink = createLink(asTr ? 'tr' : 'a');
  return (
    <TrLink
      className={trLinkStyle}
      params={{ id: id }}
      state={{ candidate: {
        adjustCount: discussion.usersForAdjust.length,
        startDateTime: discussion.startDateTime,
        endDateTime: discussion.endDateTime,
        selectedParticipantIds: checkboxSelectedList ?? undefined,
      } }}
      to='/discussion/candidate/$id'
    >
      {children}
    </TrLink>
  );
};

export default DiscussionDetailLink;
