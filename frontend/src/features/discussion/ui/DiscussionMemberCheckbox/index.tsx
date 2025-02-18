import { useParams } from '@tanstack/react-router';
import { useEffect } from 'react';

import Button from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { Flex } from '@/components/Flex';
import { Group } from '@/components/Group';
import { useGroup } from '@/hooks/useGroup';

import { useDiscussionParticipantsQuery } from '../../api/queries';
import type { DiscussionParticipantResponse } from '../../model';
import { checkboxContainerStyle } from './index.css';
import Title from './Title';

const CheckboxContents = (
  { participants }: { participants: DiscussionParticipantResponse['participants'] },
) => {
  const handleClickSearch = () => {
    // console.log(groupInfos.checkedList);
  };
  return (
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
      <Button onClick={handleClickSearch} size='lg'>확인</Button>
    </Flex>
  );
};

const DiscussionMemberCheckbox = () => {
  const params: { id: string } = useParams({ from: '/_main/discussion/$id' });
  const { participants = [], isLoading } = useDiscussionParticipantsQuery(params.id);

  const groupInfos = useGroup({
    defaultCheckedList: participants.map(({ id }) => id),
    itemIds: participants.map(({ id }) => id),
  });

  // TODO: useEffect를 사용하지 않는 방법..
  useEffect(() => {
    groupInfos.init();
  }, [participants]); 
      
  return (
    <Group groupInfos={groupInfos}>
      {!isLoading && <CheckboxContents participants={participants} />}
    </Group>
  );
};

export default DiscussionMemberCheckbox;