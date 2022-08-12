import { useMutation, useQueryClient } from 'react-query';
import EventApi from '../api/EventApi';

export const useParticipateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation(EventApi.participate, {
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};
