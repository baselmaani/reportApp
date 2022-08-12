import { useInfiniteQuery } from 'react-query';

import Feed from '../api/Feed';

export const useFeeds = ({ lat, lng }) => {
  const { data, isLoading, fetchNextPage, status } = useInfiniteQuery(
    'feeds',
    ({ pageParam }) => Feed.getNearByFeed({ lat, lng, pageParam }),
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
    isLoading,
  };
};
