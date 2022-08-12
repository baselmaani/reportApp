import { useMutation } from 'react-query';
import Report from '../api/Report';
import Toast from 'react-native-toast-message';

export const useSaveReport = () => {
  const mutation = useMutation(Report.saveReport, {
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Tack!',
        text2: 'Du har limnat en rapport!',
      });
    },
  });

  return mutation;
};
