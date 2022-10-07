import { CollectionResponse } from '../../../models/common';

interface ListBrowserFilters {
  fullText: string;
}

interface ListBrowserPager {
  page: number;
  size: number;
  orderBy: string;
  direction: 'asc' | 'desc';
}

export class ListBrowserStore {
  filters: ListBrowserFilters;
  pager: ListBrowserPager;
  total: number;

  constructor() {
    this.filters = {
      fullText: '',
    };
    this.pager = {
      page: 1,
      size: 10,
      orderBy: 'id',
      direction: 'asc',
    };
    this.total = 0;
  }
}

export interface QueryData {
  getter: () => Promise<CollectionResponse>;
  name: string;
}
