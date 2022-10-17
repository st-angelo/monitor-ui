import { Pagination, Select } from '@mantine/core';
import { useMemo } from 'react';
import { useWritable, Writable } from 'react-use-svelte-store';
import { ListBrowserStore } from './metadata';
import useListBrowserUtils from './useListBrowserUtils';

interface ListPaginationProps<T> {
  store: Writable<T>;
}

const ListPagination = <T extends ListBrowserStore>({
  store,
}: ListPaginationProps<T>) => {
  const [$store, , $update] = useWritable(store);
  const { handleChange } = useListBrowserUtils($update);

  const pages = useMemo(
    () => Math.ceil($store.total / $store.pager.size),
    [$store]
  );

  return (
    <div className='flex items-center gap-4'>
      <div>
        <Pagination
          page={$store.pager.page}
          onChange={handleChange('pager.page')}
          total={pages}
        />
      </div>
      <div className='flex gap-2 items-center'>
        <span className='text-sm'>Rows on page:</span>
        <div className='w-24'>
          <Select
            value={$store.pager.size.toString()}
            onChange={handleChange('pager.size')}
            data={['5', '10', '25', '50', '100']}
          />
        </div>
      </div>
    </div>
  );
};

export default ListPagination;
