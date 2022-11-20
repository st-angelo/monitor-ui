import { ReactNode } from 'react';
import { CollectionResponse } from '../../../models/common';
import i18next from 'i18next';

interface ListBrowserData {
  id: string;
  [key: string]: any;
}

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

export interface ListBrowserAction {
  name: string;
  visible: boolean;
  component: ReactNode;
  basic?: boolean;
}

export class ListBrowserStore {
  data: ListBrowserData[];
  filters: ListBrowserFilters;
  pager: ListBrowserPager;
  total: number;
  actions: ListBrowserAction[];
  selection: string[];

  constructor() {
    this.data = [];
    this.filters = {};
    this.pager = {
      page: 1,
      size: 10,
      orderBy: '',
      orderByFields: [],
      direction: 'desc',
    };
    this.total = 0;
    this.actions = [];
    this.selection = [];
  }
}

export interface QueryData {
  getter: (params?: any) => Promise<CollectionResponse>;
  name: string;
}

export const getDirectionOptions = () => [
  {
    value: 'asc',
    label: i18next.t('Value.Ascending'),
  },
  {
    value: 'desc',
    label: i18next.t('Value.Descending'),
  },
];
