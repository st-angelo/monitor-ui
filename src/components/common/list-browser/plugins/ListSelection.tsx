import { Button, Checkbox } from '@mantine/core';
import { IconX } from '@tabler/icons';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useWritable, Writable } from 'react-use-svelte-store';
import { ListBrowserStore } from '../metadata';
import useListBrowserUtils from '../useListBrowserUtils';

interface ListSelectionProps<T> {
  store: Writable<T>;
}

const ListSelection = <T extends ListBrowserStore>({
  store,
}: ListSelectionProps<T>) => {
  const { t } = useTranslation();
  const [$store, , $update] = useWritable(store);
  const { deselectAll } = useListBrowserUtils(store);

  const allSelected = useMemo(
    () =>
      $store.data.length > 0 &&
      $store.data.every(item => $store.selection.includes(item.id)),
    [$store]
  );

  const selectAll = useCallback(
    () =>
      $update(prev => {
        let selection = [];

        if (allSelected)
          selection = prev.selection.filter(
            key => !prev.data.some(item => item.id === key)
          );
        else
          selection = Array.from(
            new Set([...prev.selection, ...prev.data.map(item => item.id)])
          );

        return {
          ...prev,
          selection,
        };
      }),
    [$update, allSelected]
  );

  return (
    <div className='flex justify-between items-center p-2 my-2 leading-none'>
      <Checkbox
        checked={allSelected}
        label={t('Common.SelectPage', { selections: $store.selection.length })}
        onChange={selectAll}
      />
      <Button
        leftIcon={<IconX size={18} />}
        size='xs'
        variant='subtle'
        onClick={deselectAll}
      >
        {t('Common.DeselectAll')}
      </Button>
    </div>
  );
};

export default ListSelection;
