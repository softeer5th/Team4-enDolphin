import { useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';

import Button from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Flex } from '@/components/Flex';
import { Group } from '@/components/Group';
import { useGroup } from '@/hooks/useGroup';
import { checkboxAtom } from '@/store/discussion';

import { candidateKeys } from '../../api/keys';
import { useDiscussionParticipantsQuery } from '../../api/queries';
import type { DiscussionParticipantResponse } from '../../model';
import { checkboxContainerStyle } from './index.css';
import Title from './Title';

const CheckboxContents = (
  { participants, onClickSearch }: 
  { 
    participants: DiscussionParticipantResponse['participants'];
    onClickSearch: () => void;
  },
) => (
  <Flex
    align='flex-end'
    className={checkboxContainerStyle}
    direction='column'
    gap={400}
    width='14.25rem'
  >
    <Title />
    <Flex
      direction='column'
      gap={400}
      width='100%'
    >
      <Checkbox type='all'>전체</Checkbox>
      {participants.map(({ id, name }) => (
        <Checkbox key={id} value={id}>{name}</Checkbox>
      ))}
    </Flex>
    <Button onClick={onClickSearch} size='lg'>확인</Button>
  </Flex>
);

const DiscussionMemberCheckbox = () => {
  const params: { id: string } = useParams({ from: '/_main/discussion/$id' });
  const { participants = [], isPending } = useDiscussionParticipantsQuery(params.id);
  const participantsIds = useMemo(() => participants.map(({ id }) => id), [participants]);
  const [checkbox, setCheckbox] = useAtom(checkboxAtom);

  useEffect(()=>{
    if (!checkbox && participants.length) setCheckbox(participants.map(({ id }) => id));
  }, [participants, checkbox, setCheckbox]);

  const groupInfos = useGroup({
    defaultCheckedList: checkbox || participantsIds,
    itemIds: participantsIds,
  });

  const queryClient = useQueryClient();

  const handleClickSearch = async () => {
    if (!checkbox) return;
    setCheckbox(Array.from(groupInfos.checkedList));
    queryClient.invalidateQueries({
      queryKey: candidateKeys.detail(params.id),
    });
  };
      
  return (
    <Group groupInfos={groupInfos}>
      {!isPending && 
      <CheckboxContents 
        onClickSearch={handleClickSearch}
        participants={participants}
      />}
    </Group>
  );
};

export default DiscussionMemberCheckbox;