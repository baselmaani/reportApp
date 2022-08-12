import { useMutation } from 'react-query';
import { User } from '../api/User';

export const useSaveProfile = () => {
  const saveMutation = useMutation(User.updateProfile);

  return saveMutation;
};
