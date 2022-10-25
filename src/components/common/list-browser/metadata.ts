import { CollectionResponse } from '../../../models/common';

interface ListBrowserFilters {
  [key: string]: any;
}

interface ListBrowserPager {
  page: number;
  size: number;
  orderBy: string;
  orderByFields: { value: string; label: string }[];
  direction: 'asc' | 'desc';
}

export class ListBrowserStore {
  filters: ListBrowserFilters;
  pager: ListBrowserPager;
  total: number;

  constructor() {
    this.filters = {};
    this.pager = {
      page: 1,
      size: 10,
      orderBy: '',
      orderByFields: [],
      direction: 'desc',
    };
    this.total = 0;
  }
}

export interface QueryData {
  getter: (params?: any) => Promise<CollectionResponse>;
  name: string;
}

export const directionOptions = [
  {
    value: 'asc',
    label: 'Ascending',
  },
  {
    value: 'desc',
    label: 'Descending',
  },
];
