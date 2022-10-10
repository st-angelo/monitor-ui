import axios from '../../utils/axios';
import { useCallback, useMemo } from 'react';
import { Category, CollectionResponse } from '../../models/common';
import ListBrowser from '../../components/common/list-browser/ListBrowser';
import categoriesListStore from './categoriesListStore';
import CategoryComponent from './CategoryComponent';
import { GetCategoriesParams } from '../../models/userProfile';

const CategoriesComponent = () => {
  const getUserCategories = useCallback(
    async ({
      fullText,
      orderBy,
      direction,
      page,
      size,
    }: GetCategoriesParams) => {
      const response = await axios.get<CollectionResponse<Category>>(
        `/user/category?name=${fullText}&$orderBy=${orderBy}&$direction=${direction}&$page=${page}&$size=${size}`
      );
      return response.data;
    },
    []
  );

  const queryData = useMemo(
    () => ({
      name: 'user-categories',
      getter: getUserCategories,
    }),
    [getUserCategories]
  );

  return (
    <ListBrowser
      store={categoriesListStore}
      queryData={queryData}
      ItemComponent={CategoryComponent}
    />
  );
};

export default CategoriesComponent;
