import { Pagination } from '@mantine/core';
import { useMemo } from 'react';
import { useReadable, Writable } from 'react-use-svelte-store';
import { ListBrowserStore } from './metadata';

interface ListPaginationProps<T> {
  store: Writable<T>;
}

const ListPagination = <T extends ListBrowserStore>({
  store,
}: ListPaginationProps<T>) => {
  const $store = useReadable(store);

  const pages = useMemo(
    () => Math.ceil($store.total / $store.pager.size),
    [$store]
  );

  return <Pagination total={pages} />;
};

export default ListPagination;
