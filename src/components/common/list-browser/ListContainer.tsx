import { Container, Sx } from '@mantine/core';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useWritable, Writable } from 'react-use-svelte-store';
import LoadingLines from '../loading/LoadingLines';
import { Refresh } from './ListAction';
import { ListBrowserStore, QueryData } from './metadata';

interface ListContainerProps<T> {
  store: Writable<T>;
  queryData: QueryData;
  ItemComponent: (props: { data: any }) => JSX.Element;
  listContainerStyles?: Sx;
}

const ListContainer = <T extends ListBrowserStore>({
  store,
  queryData,
  ItemComponent,
  listContainerStyles,
}: ListContainerProps<T>) => {
  const { t } = useTranslation();
  const [
    {
      filters,
      pager: { orderBy, direction, page, size },
    },
    ,
    $update,
  ] = useWritable(store);

  const { data, isFetching, isLoading, refetch } = useQuery(
    [queryData.name, { ...filters }, orderBy, direction, page, size],
    () =>
      queryData.getter({
        ...filters,
        orderBy,
        direction,
        page,
        size,
      })
  );

  const values = useMemo(() => data?.values || [], [data]);

  const total = useMemo(() => data?.total || 0, [data]);

  const loading = useMemo(
    () => !data || isFetching || isLoading,
    [data, isFetching, isLoading]
  );

  useEffect(() => {
    $update(prev => ({ ...prev, data: values }));
  }, [$update, values]);

  useEffect(() => {
    $update(prev => {
      if (prev.actions.some(action => action.name === 'Refresh')) return prev;
      return {
        ...prev,
        actions: [
          ...prev.actions,
          {
            name: 'Refresh',
            visible: true,
            component: <Refresh handler={refetch} />,
          },
        ],
      };
    });
  }, [$update, refetch]);

  useEffect(() => {
    $update(prev => ({ ...prev, total }));
  }, [$update, total]);

  return (
    <div className='my-4'>
      {loading && <LoadingLines size={8} />}
      {!loading && (
        <>
          {values.length === 0 && (
            <span className={'italic'}>{t('Common.NoEntries')}</span>
          )}
          {values.length > 0 && (
            <Container
              fluid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.75rem',
                padding: 0,
                ...listContainerStyles,
              }}
            >
              {values.map((item, index) => (
                <ItemComponent data={item} key={index} />
              ))}
            </Container>
          )}
        </>
      )}
    </div>
  );
};

export default ListContainer;
