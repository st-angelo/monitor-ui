import { Category, GetCollectionParams } from './common';

export interface TransactionType {
  Spending: 'Spending';
  Earning: 'Earning';
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: Date;
  currency: string;
  category?: Category;
  userId: string;
  isRecurrent?: boolean;
}

export interface GetTransactionsParams extends GetCollectionParams {}
