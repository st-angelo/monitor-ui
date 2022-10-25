import { Select, Grid } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useWritable, Writable } from 'react-use-svelte-store';
import { ListBrowserStore, directionOptions } from './metadata';
import useListBrowserUtils from './useListBrowserUtils';

interface ListFilersProps<T> {
  store: Writable<T>;
}

const ListFilers = <T extends ListBrowserStore>({
  store,
}: ListFilersProps<T>) => {
  const { t } = useTranslation();
  const [$store, , $update] = useWritable(store);
  const { handleChange } = useListBrowserUtils($update);

  return (
    <Grid>
      <Grid.Col span={6}>
        <Select
          value={$store.pager.orderBy}
          onChange={handleChange('pager.orderBy')}
          label={t('Label.Sort.OrderBy')}
          data={$store.pager.orderByFields}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <Select
          value={$store.pager.direction}
          onChange={handleChange('pager.direction')}
          label={t('Label.Sort.Direction')}
          data={directionOptions}
        />
      </Grid.Col>
    </Grid>
  );
};

export default ListFilers;
