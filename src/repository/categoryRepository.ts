import { Category, CollectionResponse } from '../models/common';
import { GetCategoriesParams, MutateCategoryData } from '../models/userProfile';
import axios from '../utils/axios';

export const getCategories = async () => {
  const response = await axios.get<Category[]>('/dictionary/category');
  return response.data;
};

export const getUserCategories = async ({
  name,
  description,
  transactionTypeId,
  orderBy,
  direction,
  page,
  size,
}: GetCategoriesParams) => {
  const response = await axios.get<CollectionResponse<Category>>(
    `/user/category?name=${name || ''}&description=${
      description || ''
    }&transactionTypeId=${
      transactionTypeId || ''
    }&$orderBy=${orderBy}&$direction=${direction}&$page=${page}&$size=${size}`
  );
  return response.data;
};

export const addCategory = (input: MutateCategoryData) => {
  return axios.post('/user/category', { ...input });
};

export const updateCategory = (input: MutateCategoryData) => {
  return axios.patch(`/user/category/${input.id}`, { ...input });
};

export const deleteCategory = (categoryId: string) => {
  return axios.delete(`/user/category/${categoryId}`);
};
