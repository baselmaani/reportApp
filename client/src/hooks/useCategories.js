import { useQuery } from 'react-query';

import Category from '../api/Category';

export const useCategories = () => {
  const { data, isLoading } = useQuery('categories', Category.getAll);

  return {
    data,
    isLoading,
  };
};
