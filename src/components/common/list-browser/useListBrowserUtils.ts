import { useCallback } from 'react';
import { Updater } from 'react-use-svelte-store';
import { setNestedProperty } from '../../../utils/functions';
import { ListBrowserStore } from './metadata';

const useListBrowserUtils = <T extends ListBrowserStore>(
  $update: Updater<T>
) => {
  const handleChange = useCallback(
    (path: string) => (value: any) => {
      $update(prev => {
        const newValue = { ...prev, pager: { ...prev.pager, page: 1 } };
        setNestedProperty(newValue, path, value);
        return newValue;
      });
    },
    []
  );

  return { handleChange };
};

export default useListBrowserUtils;
