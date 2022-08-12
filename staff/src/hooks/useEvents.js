import { useInfiniteQuery, useQuery } from 'react-query';

import EventApi from '../api/EventApi';

export const useEvents = ({ lat, lng }) => {
  const { data, hasNextPage, fetchNextPage, status } = useInfiniteQuery(
    'events',
    ({ pageParam }) => EventApi.getNearByEvents({ lat, lng, pageParam }),
    {
      enabled: lat && lng ? true : false,
      getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    }
  );

  const loadMore = () => {
    fetchNextPage();
  };

  return {
    data,
    status,
    loadMore,
  };
};
