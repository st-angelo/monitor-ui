import { writable } from 'react-use-svelte-store';
import { ListBrowserStore } from '../../components/common/list-browser/metadata';

interface CategoryFilters {
  name: string;
  description: string;
  color: string;
}

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
      name: '',
      description: '',
      color: '',
    };
  }
}

const store = writable(new CategoryListStore());

export default store;
