import { ImplicitValues } from '../models/common';
import axios from '../utils/axios';

export const getImplicitValues = async () => {
  const response = await axios.get<ImplicitValues>(
    '/miscellaneous/implicit-values'
  );
  return response.data;
};
