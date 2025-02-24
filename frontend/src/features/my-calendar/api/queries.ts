import { useQuery } from '@tanstack/react-query';

import type { DateRangeParams, PersonalEventResponse } from '../model';
import { personalEventApi } from '.';
import { personalEventKeys } from './keys';

export const usePersonalEventsQuery = (params: DateRangeParams) => {
  const { data: personalEvents, isPending } = useQuery<PersonalEventResponse[]>({
    queryKey: personalEventKeys.detail(params), 
    queryFn: () => personalEventApi.getPersonalEvent(params),
  });

  return { personalEvents, isPending };
};