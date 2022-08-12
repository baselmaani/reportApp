import { useQuery } from 'react-query';
import { User } from '../api/User';

export const useProfile = () => {
  return useQuery('profile', User.getProfile);
};
