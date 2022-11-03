import { Sx } from '@mantine/core';
import { Writable } from 'react-use-svelte-store';
import ListContainer from './ListContainer';
import ListPagination from './ListPagination';
import { ListBrowserStore, QueryData } from './metadata';
import ListHeader from './ListHeader';
import ListSelection from './plugins/ListSelection';

interface ListBrowserProps<T> {
  store: Writable<T>;
  queryData: QueryData;
  HeaderComponent?: () => JSX.Element;
  ItemComponent: (props: { data: any }) => JSX.Element;
  withSelection?: boolean;
  listContainerStyles?: Sx;
}

const ListBrowser = <T extends ListBrowserStore>({
  store,
  queryData,
  HeaderComponent,
  ItemComponent,
  withSelection,
  listContainerStyles,
}: ListBrowserProps<T>) => {
  return (
    <>
      <ListHeader store={store} />
      {HeaderComponent && <HeaderComponent />}
      {withSelection && <ListSelection store={store} />}
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
