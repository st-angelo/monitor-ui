import { Category, Currency, GetCollectionParams } from './common';

export interface TransactionType {
  id: string;
  code: string;
}

export interface Transaction {
  id: string;
  typeId: string;
  amount: number;
  date: string;
  currency: Currency;
  category: Category;
  isRecurrent?: boolean;
}

export interface TransactionForSummary {
  id: string;
  typeId: string;
  amount: number;
  date: string;
  currencyCode: string;
  categoryId: string;
}

export interface MutateTransactionData {
  id?: string;
  typeId: string | null;
  amount?: number;
  date?: Date;
  currencyId: string | null;
  categoryId?: string;
  isRecurrent?: boolean;
}

export interface GetTransactionsParams extends GetCollectionParams {
  dateFrom: Date;
  dateTo: Date;
  typeId: string;
  categoryId: string;
  currencyId: string;
  amountFrom: number;
  amountTo: number;
}
