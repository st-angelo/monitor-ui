import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { MiscellaneousInfo } from '../../../models/common';
import { getMiscellaneousInfo } from '../../../repository/userRepository';
import { longCacheTime } from '../../../utils/constants';

const defaultMiscellaneousInfo: MiscellaneousInfo = {};

export const useMiscellaneousInfo = (
  callback: (data: MiscellaneousInfo) => void = _ => {}
) => {
  const { data } = useQuery(['miscellaneous-info'], getMiscellaneousInfo, {
    cacheTime: longCacheTime,
    staleTime: longCacheTime,
  });

  useEffect(() => {
    if (!data) return;
    callback(data);
  }, [data, callback]);

  return data || defaultMiscellaneousInfo;
};
