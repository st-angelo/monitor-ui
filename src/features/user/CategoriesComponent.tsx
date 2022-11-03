import { useMemo } from 'react';
import ListBrowser from '../../components/common/list-browser/ListBrowser';
import categoriesListStore from './categoriesListStore';
import CategoryComponent from './CategoryComponent';
import { getUserCategories } from '../../repository/categoryRepository';
import CategoryFiltersComponent from './CategoryFiltersComponent';

const CategoriesComponent = () => {
  const queryData = useMemo(
    () => ({
      name: 'user-categories',
      getter: getUserCategories,
    }),
    []
  );

  return (
    <ListBrowser
      store={categoriesListStore}
      queryData={queryData}
      HeaderComponent={CategoryFiltersComponent}
      ItemComponent={CategoryComponent}
    />
  );
};

export default CategoriesComponent;
