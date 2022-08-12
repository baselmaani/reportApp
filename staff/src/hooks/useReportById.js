import Report from '../api/Report';
import { useQuery } from 'react-query';
export const useReportById = (id) => {
  console.log('id', id);
  const { data, isLoading } = useQuery(['report', id], () =>
    Report.getReportById(id)
  );
  return {
    data,
    isLoading,
  };
};
