import { useQuery } from 'react-query';
import Report from '../api/Report';

export const useNearByReports = () => {
  const { data, isLoading, isError } = useQuery('reports', () =>
    Report.getNearByReports()
  );
  return { data, isLoading, isError };
};
