import { useQuery } from '@tanstack/react-query';

import type { DateRangeParams, PersonalEventResponse } from '../model';
import { personalEventApi } from '.';
import { personalEventKeys } from './keys';

export const usePersonalEventsQuery = (params: DateRangeParams) => {
  const { data: personalEvents, isLoading } = useQuery<PersonalEventResponse[]>({
    queryKey: personalEventKeys.detail(params), 
    queryFn: () => personalEventApi.getPersonalEvent(params),
  });

  return { personalEvents, isLoading };
};