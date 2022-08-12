import { useMutation, useQueryClient } from 'react-query';
import Toast from 'react-native-toast-message';
import Comment from '../api/Comment';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(Comment.removeComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('feeds');
      queryClient.invalidateQueries('comments');
    },
  });

  return mutation;
};
