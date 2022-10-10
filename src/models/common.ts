export interface CollectionResponse<T = any> {
  total: number;
  values: T[];
}

export interface GetCollectionParams {
  fullText: string;
  orderBy: string;
  direction: number;
  page: number;
  size: number;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  color: string;
}

