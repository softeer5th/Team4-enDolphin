import { useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useEffect } from 'react';

import Button from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Flex } from '@/components/Flex';
import { Group } from '@/components/Group';
import { useGroup } from '@/hooks/useGroup';
import { useMemberContext } from '@/pages/DiscussionPage/MemberContext';

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
  const { participants = [], isLoading } = useDiscussionParticipantsQuery(params.id);
  const groupInfos = useGroup({
    defaultCheckedList: participants.map(({ id }) => id),
    itemIds: participants.map(({ id }) => id),
  });

  const members = useMemberContext();
  const handleClickSearch = async () => {
    if (!members) return;
    members.handleUpdateField('checkedList', Array.from(groupInfos.checkedList));
  };

  // TODO: useEffect를 사용하지 않는 방법..
  useEffect(() => {
    groupInfos.init();
  }, [participants]); 
      
  return (
    <Group groupInfos={groupInfos}>
      {!isLoading && 
      <CheckboxContents 
        onClickSearch={handleClickSearch}
        participants={participants}
      />}
    </Group>
  );
};

export default DiscussionMemberCheckbox;