import { Container, Sx } from '@mantine/core';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useWritable, Writable } from 'react-use-svelte-store';
import LoadingLines from '../LoadingLines';
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
  const [$store, , updateValues] = useWritable(store);

  const { data, isFetching, isLoading } = useQuery(
    queryData.name,
    queryData.getter,
    {
      onSuccess: data => updateValues(prev => ({ ...prev, total: data.total })),
    }
  );

  const values = useMemo(() => data?.values || [], [data]);

  const loading = useMemo(
    () => !data || isFetching || isLoading,
    [isFetching, isLoading]
  );

  return (
    <>
      {loading && <LoadingLines />}
      {!loading && (
        <>
          {values.length === 0 && <span>No entries </span>}
          {values.length > 0 && (
            <Container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5rem',
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
