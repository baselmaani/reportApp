import { useQuery } from 'react-query';

import Category from '../api/Category';
import Comment from '../api/Comment';
import Feed from '../api/Feed';

export const useFeedComments = ({ feedId, limit }) => {
  const { data, isLoading } = useQuery(['comments', feedId, limit], () =>
    Comment.getFeedComments({ feedId, limit })
  );

  return {
    data,
    isLoading,
  };
};
