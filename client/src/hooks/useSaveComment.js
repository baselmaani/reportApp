import { useMutation, useQueryClient } from 'react-query';

import Comment from '../api/Comment';

export const useSaveComment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(Comment.addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('feeds');
      queryClient.invalidateQueries('comments');
    },
  });

  return mutation;
};
