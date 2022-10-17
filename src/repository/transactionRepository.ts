import { CollectionResponse } from '../models/common';
import { GetTransactionsParams, Transaction } from '../models/transaction';
import axios from '../utils/axios';

export const getTransactions = async ({
  fullText,
  orderBy,
  direction,
  page,
  size,
}: GetTransactionsParams) => {
  const response = await axios.get<CollectionResponse<Transaction>>(
    `/transaction?currency=${fullText}&$orderBy=${orderBy}&$direction=${direction}&$page=${page}&$size=${size}`
  );
  return response.data;
};
