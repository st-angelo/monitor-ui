import { useQuery } from 'react-query';
import { getImplicitValues } from '../../../repository/userRepository';
import { longCacheTime } from '../../../utils/constants';

export const useImplicitValues = () => {
  const { data } = useQuery(['implicit-values'], getImplicitValues, {
    cacheTime: longCacheTime,
    staleTime: longCacheTime,
  });

  return data;
};
