import { Select, Grid } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useReadable, Writable } from 'react-use-svelte-store';
import { ListBrowserStore, getDirectionOptions } from './metadata';
import useListBrowserUtils from './useListBrowserUtils';

interface ListFilersProps<T> {
  store: Writable<T>;
}

const ListFilers = <T extends ListBrowserStore>({
  store,
}: ListFilersProps<T>) => {
  const { t } = useTranslation();
  const $store = useReadable(store);
  const { handleChange } = useListBrowserUtils(store);

  return (
    <Grid>
      <Grid.Col span={6}>
        <Select
          value={$store.pager.orderBy}
          onChange={handleChange('pager.orderBy')}
          label={t('Label.Sort.OrderBy')}
          data={$store.pager.orderByFields.map(({ value, label }) => ({
            value,
            label: t(`Value.${label}`),
          }))}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <Select
          value={$store.pager.direction}
          onChange={handleChange('pager.direction')}
          label={t('Label.Sort.Direction')}
          data={getDirectionOptions()}
        />
      </Grid.Col>
    </Grid>
  );
};

export default ListFilers;
