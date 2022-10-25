import axios from '../utils/axios';
import { AddCategoryData, GetCategoriesParams } from '../models/userProfile';
import { Category, CollectionResponse } from '../models/common';

export const getCategories = async () => {
  const response = await axios.get<Category[]>('/dictionary/category');
  return response.data;
};

export const getUserCategories = async ({
  orderBy,
  direction,
  page,
  size,
}: GetCategoriesParams) => {
  const response = await axios.get<CollectionResponse<Category>>(
    `/user/category?$orderBy=${orderBy}&$direction=${direction}&$page=${page}&$size=${size}`
  );
  return response.data;
};

export const addCategory = (input: AddCategoryData) => {
  return axios.post('/user/category', {
    data: {
      ...input,
    },
  });
};
