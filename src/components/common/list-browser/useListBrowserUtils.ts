import { useCallback } from 'react';
import { useWritable, Writable } from 'react-use-svelte-store';
import { setNestedProperty } from '../../../utils/functions';
import { ListBrowserAction, ListBrowserStore } from './metadata';

const useListBrowserUtils = <T extends ListBrowserStore>(
  store: Writable<T>
) => {
  const [$store, , $update] = useWritable(store);

  const handleChange = useCallback(
    (path: string) => (value: any) => {
      $update(prev => {
        const newValue = { ...prev, pager: { ...prev.pager, page: 1 } };
        setNestedProperty(newValue, path, value);
        return newValue;
      });
    },
    [$update]
  );

  const addOrUpdateActions = useCallback(
    (actions: ListBrowserAction[]) =>
      $update(prev => {
        const newActions = actions.filter(
          action => !prev.actions.some(({ name }) => name === action.name)
        );
        return {
          ...prev,
          actions: [
            ...prev.actions.map(
              action =>
                actions.find(({ name }) => name === action.name) ?? action
            ),
            ...newActions,
          ],
        };
      }),
    [$update]
  );

  const getIsSelected = useCallback(
    (key: string) => $store.selection.some(selection => selection === key),
    [$store]
  );

  const handleSelect = useCallback(
    (key: string) =>
      $update(prev => ({
        ...prev,
        selection: getIsSelected(key)
          ? prev.selection.filter(selection => selection !== key)
          : [...prev.selection, key],
      })),
    [$update, getIsSelected]
  );

  const removeSelections = useCallback(
    (keys: string[]) =>
      $update(prev => ({
        ...prev,
        selection: prev.selection.filter(key => !keys.includes(key)),
      })),
    [$update]
  );

  const deselectAll = useCallback(
    () =>
      $update(prev => ({
        ...prev,
        selection: [],
      })),
    [$update]
  );

  return {
    handleChange,
    addOrUpdateActions,
    getIsSelected,
    handleSelect,
    removeSelections,
    deselectAll,
  };
};

export default useListBrowserUtils;
