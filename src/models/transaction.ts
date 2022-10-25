import { Category, Currency, GetCollectionParams } from './common';

export interface TransactionType {
  id: string;
  code: string;
}

export interface Transaction {
  id: string;
  typeId: string;
  amount: number;
  date: Date;
  currency: Currency;
  category?: Category;
  isRecurrent?: boolean;
}

export class MutateTransactionData {
  id?: string;
  typeId?: string;
  amount?: number;
  date?: Date;
  currencyId?: string;
  categoryId?: string;
  isRecurrent?: boolean;

  constructor(transaction: Transaction) {
    this.id = transaction.id;
    this.typeId = transaction.typeId;
    this.amount = transaction.amount;
    this.date = transaction.date;
    this.currencyId = transaction.currency.id || '';
    this.categoryId = transaction.category?.id || '';
    this.isRecurrent = transaction.isRecurrent;
  }
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
