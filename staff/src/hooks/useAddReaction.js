import { useMutation, useQueryClient } from 'react-query';
import Report from '../api/Report';
import Toast from 'react-native-toast-message';

export const useAddReaction = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(Report.addReaction, {
    onSuccess: () => {
      queryClient.invalidateQueries('nearByReports');
    },
    onError: (err) => {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: err,
      });
    },
  });

  return mutation;
};
