import { useQuery } from '@tanstack/react-query';

import type { PersonalEventDTO, PersonalEventResponse } from '../model';
import { personalEventApi } from '.';
import { personalEventKeys } from './keys';

export const usePersonalEventsQuery = (
  data: Pick<PersonalEventDTO, 'startDateTime' | 'endDateTime'>,
) => {
  const { data: personalEvents, isLoading } = useQuery<PersonalEventResponse[]>({
    queryKey: personalEventKeys.detail(data), 
    queryFn: () => personalEventApi.getPersonalEvent(data),
  });

  return { personalEvents, isLoading };
};