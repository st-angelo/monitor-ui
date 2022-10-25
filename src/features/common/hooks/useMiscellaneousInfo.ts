import { useQuery } from 'react-query';
import { MiscellaneousInfo } from '../../../models/common';
import { getMiscellaneousInfo } from '../../../repository/userRepository';

const defaultMiscellaneousInfo: MiscellaneousInfo = {};

export const useMiscellaneousInfo = () => {
  const { data } = useQuery(['miscellaneous-info'], getMiscellaneousInfo);

  return data || defaultMiscellaneousInfo;
};
