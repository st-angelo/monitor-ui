import { Pagination, Select } from '@mantine/core';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useReadable, Writable } from 'react-use-svelte-store';
import { ListBrowserStore } from './metadata';
import useListBrowserUtils from './useListBrowserUtils';

interface ListPaginationProps<T> {
  store: Writable<T>;
}

const ListPagination = <T extends ListBrowserStore>({
  store,
}: ListPaginationProps<T>) => {
  const { t } = useTranslation();
  const $store = useReadable(store);
  const { handleChange } = useListBrowserUtils(store);

  const pages = useMemo(
    () => Math.ceil($store.total / $store.pager.size),
    [$store]
  );

  return (
    <div className='flex items-center gap-4'>
      <div>
        <Pagination
          page={$store.pager.page}
          disabled={!pages}
          onChange={handleChange('pager.page')}
          total={pages}
        />
      </div>
      <div className='flex gap-2 items-center'>
        <span className='text-sm'>{t('Common.RowsOnPage')}:</span>
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
