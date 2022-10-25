import { MiscellaneousInfo } from '../models/common';
import axios from '../utils/axios';

export const getMiscellaneousInfo = async () => {
  const response = await axios.get<MiscellaneousInfo>(
    '/user/miscellaneous-info'
  );
  return response.data;
};
