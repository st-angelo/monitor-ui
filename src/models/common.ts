export interface CollectionResponse<T = any> {
  total: number;
  values: T[];
}

export interface GetCollectionParams {
  orderBy: string;
  direction: number;
  page: number;
  size: number;
}

export interface Category {
  id: string;
  code: string;
  name: string;
  description: string | null;
  transactionTypeId: string;
  color: string;
}

export interface Currency {
  id: string;
  code: string;
}

export interface MiscellaneousInfo {
  implicitTransactionTypeId?: string;
  implicitCurrencyId?: string;
}
