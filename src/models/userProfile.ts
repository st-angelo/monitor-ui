import { GetCollectionParams } from './common';

export interface AddCategoryData {
  name: string;
  description: string | null;
  color: string;
}

export interface GetCategoriesParams extends GetCollectionParams {
  name: string;
  description: string;
  transactionTypeId: string;
}
