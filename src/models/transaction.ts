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

export class MutateTransactionData {
  id?: string;
  typeId: string | null;
  amount?: number;
  date?: Date;
  currencyId: string | null;
  categoryId?: string;
  isRecurrent?: boolean;

  constructor(transaction: Transaction) {
    this.id = transaction.id;
    this.typeId = transaction.typeId;
    this.amount = transaction.amount;
    this.date = new Date(transaction.date);
    this.currencyId = transaction.currency.id || '';
    this.categoryId = transaction.category.id || '';
    this.isRecurrent = transaction.isRecurrent;
  }
}

export const getMutateTransactionInitialData = () => ({
  typeId: localStorage.getItem('lastTransactionTypeId'),
  date: new Date(),
  currencyId: localStorage.getItem('lastCurrencyId'),
  isRecurrent: false,
});

export interface GetTransactionsParams extends GetCollectionParams {
  dateFrom: Date;
  dateTo: Date;
  typeId: string;
  categoryId: string;
  currencyId: string;
  amountFrom: number;
  amountTo: number;
}
