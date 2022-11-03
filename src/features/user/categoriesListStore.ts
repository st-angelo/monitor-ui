import { writable } from 'react-use-svelte-store';
import { ListBrowserStore } from '../../components/common/list-browser/metadata';

interface CategoryFilters {
  name: string | null;
  description: string | null;
  transactionTypeId: string | null;
}

export const defaultCategoryFilters: CategoryFilters = {
  name: null,
  description: null,
  transactionTypeId: null,
};

class CategoryListStore extends ListBrowserStore {
  categoryFilters: CategoryFilters;
  constructor() {
    super();
    this.pager.orderByFields = [
      { value: 'name', label: 'Name' },
      { value: 'description', label: 'Description' },
    ];
    this.pager.orderBy = 'name';
    this.categoryFilters = {
      ...defaultCategoryFilters,
    };
  }
}

const store = writable(new CategoryListStore());

export default store;
