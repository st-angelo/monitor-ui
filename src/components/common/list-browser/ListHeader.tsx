import { Card, Grid, Group } from '@mantine/core';
import orderBy from 'lodash.orderby';
import React from 'react';
import { useReadable, Writable } from 'react-use-svelte-store';
import ListFilers from './ListFilters';
import { ListBrowserStore } from './metadata';

interface ListHeaderProps<T> {
  store: Writable<T>;
}

const ListHeader = <T extends ListBrowserStore>({
  store,
}: ListHeaderProps<T>) => {
  const $store = useReadable(store);

  return (
    <Card p={'xs'} className='shadow-md overflow-visible'>
      <Grid align={'end'}>
        <Grid.Col span={8}>
          <ListFilers store={store} />
        </Grid.Col>
        <Grid.Col span={4}>
          <Group spacing={'sm'} position='right'>
            {orderBy(
              $store.actions.filter(action => action.visible),
              'basic',
              'desc'
            ).map(action => (
              <React.Fragment key={action.name}>
                {action.component}
              </React.Fragment>
            ))}
          </Group>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default ListHeader;
