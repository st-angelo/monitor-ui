import { writable } from 'react-use-svelte-store';

interface LoaderStore {
  open: boolean;
}

const store = writable<LoaderStore>({ open: false });

export default store;
