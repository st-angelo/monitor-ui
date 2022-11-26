import { Category, Currency, GetCollectionParams } from './common';

export enum Recurrence {
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Quarterly = 'Quarterly',
  Yearly = 'Yearly',
}

export const getRecurrenceTypes = () => Object.values(Recurrence);

export interface TransactionType {
  id: string;
  code: string;
}

export interface Transaction {
  id: string;
  typeId: string;
  amount: number;
  date: string;
  currencyId: string;
  currency: Currency;
  categoryId: string;
  category: Category;
  recurrence?: Recurrence;
}

export interface TransactionForSummary {
  id: string;
  typeId: string;
  amount: number;
  date: string;
  currencyCode: string;
  categoryId: string;
}

export interface LatestTransactionData {
  lastTransactions: Transaction[];
  topCategories: {
    categoryId: string;
    count: number;
  }[];
}

export interface MutateTransactionData {
  id?: string;
  typeId: string | null;
  amount?: number;
  date?: Date;
  currencyId: string | null;
  categoryId?: string;
  recurrence?: Recurrence | null;
}

export interface GetTransactionsParams extends GetCollectionParams {
  dateFrom: Date;
  dateTo: Date;
  typeId: string;
  categoryId: string;
  currencyId: string;
  amountFrom: number;
  amountTo: number;
  isRecurrent: boolean;
}
