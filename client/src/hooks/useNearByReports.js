import { useQuery } from 'react-query';
import Report from '../api/Report';

export const useNearByReports = ({ lat, lng }) => {
  console.log(lat);
  console.log(lng);
  const { data, isLoading, isError } = useQuery(
    'nearByReports',
    () => Report.getNearByReports({ lat, lng }),
    {
      enabled: !!lat && !!lng,
    }
  );
  return { data, isLoading, isError };
};
