import axios from '../../utils/axios';
import { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import LoadingLines from '../../components/common/LoadingLines';

const CategoriesComponent = () => {
  const getUserCategories = useCallback(() => {
    return axios({
      method: 'GET',
      url: '/user/category',
    });
  }, []);

  const { data, isFetching, isLoading } = useQuery(
    'user-categories',
    getUserCategories
  );

  const loading = useMemo(
    () => isFetching || isLoading,
    [isFetching, isLoading]
  );

  return (
    <>
      {loading && <LoadingLines />}
      {!loading && console.log(data?.data.data)}
    </>
  );
};

export default CategoriesComponent;
