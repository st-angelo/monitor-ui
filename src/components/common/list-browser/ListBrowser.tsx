import { Sx } from '@mantine/core';
import { Writable } from 'react-use-svelte-store';
import ListContainer from './ListContainer';
import ListPagination from './ListPagination';
import ListFilers from './ListFilters';
import { ListBrowserStore, QueryData } from './metadata';

interface ListBrowserProps<T> {
  store: Writable<T>;
  queryData: QueryData;
  HeaderComponent?: () => JSX.Element;
  ItemComponent: (props: { data: any }) => JSX.Element;
  listContainerStyles?: Sx;
}

const ListBrowser = <T extends ListBrowserStore>({
  store,
  queryData,
  HeaderComponent,
  ItemComponent,
  listContainerStyles,
}: ListBrowserProps<T>) => {
  return (
    <>
      <ListFilers store={store} />
      {HeaderComponent && <HeaderComponent />}
      <ListContainer
        store={store}
        queryData={queryData}
        ItemComponent={ItemComponent}
        listContainerStyles={listContainerStyles}
      />
      <ListPagination store={store} />
    </>
  );
};

export default ListBrowser;
