import { Container, Sx } from '@mantine/core';
import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useWritable, Writable } from 'react-use-svelte-store';
import LoadingLines from '../loading/LoadingLines';
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
  const [
    {
      filters,
      pager: { orderBy, direction, page, size },
    },
    ,
    $update,
  ] = useWritable(store);

  const { data, isFetching, isLoading } = useQuery(
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
    [isFetching, isLoading]
  );

  useEffect(() => {
    $update(prev => ({ ...prev, total }));
  }, [total]);

  return (
    <>
      {loading && (
        <div className='my-4'>
          <LoadingLines />
        </div>
      )}
      {!loading && (
        <>
          {values.length === 0 && <span>No entries </span>}
          {values.length > 0 && (
            <Container
              fluid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.75rem',
                padding: 0,
                marginBlock: '1rem',
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
    </>
  );
};

export default ListContainer;
