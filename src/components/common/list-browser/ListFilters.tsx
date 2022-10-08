import { useWritable, Writable } from 'react-use-svelte-store';
import { ListBrowserStore } from './metadata';

interface ListFilersProps<T> {
  store: Writable<T>;
}

const ListFilers = <T extends ListBrowserStore>({
  store,
}: ListFilersProps<T>) => {
  const [$store, , updateValues] = useWritable(store);

  return <></>;
};

export default ListFilers;
