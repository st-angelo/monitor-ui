export interface CollectionResponse<T = any> {
  total: number;
  values: T[];
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  color: string;
}
