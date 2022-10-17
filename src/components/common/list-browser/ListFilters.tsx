import { Select, Grid } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons';
import { useWritable, Writable } from 'react-use-svelte-store';
import DebouncedTextInput from '../inputs/DebouncedTextInput';
import { ListBrowserStore, directionOptions } from './metadata';
import useListBrowserUtils from './useListBrowserUtils';

interface ListFilersProps<T> {
  store: Writable<T>;
}

const ListFilers = <T extends ListBrowserStore>({
  store,
}: ListFilersProps<T>) => {
  const [$store, , $update] = useWritable(store);
  const { handleChange } = useListBrowserUtils($update);

  return (
    <Grid>
      <Grid.Col span={4}>
        <DebouncedTextInput
          value={$store.filters.fullText}
          onChange={handleChange('filters.fullText')}
          label={'Search'}
          icon={<IconSearch size={14} />}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Select
          value={$store.pager.orderBy}
          onChange={handleChange('pager.orderBy')}
          label={'Order by'}
          data={$store.pager.orderByFields}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Select
          value={$store.pager.direction}
          onChange={handleChange('pager.direction')}
          label={'Search'}
          data={directionOptions}
        />
      </Grid.Col>
    </Grid>
  );
};

export default ListFilers;
