import { useMutation, useQueryClient } from 'react-query';
import Toast from 'react-native-toast-message';
import FeedReaction from '../api/FeedReaction';

export const useSaveFeedReaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(FeedReaction.addReaction, {
    onSuccess: () => {
      queryClient.invalidateQueries('feeds');
    },
  });

  return mutation;
};
