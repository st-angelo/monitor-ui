import { writable } from 'react-use-svelte-store';

interface ConfirmDialogStore {
  open: boolean;
  callback: () => void;
}

const store = writable<ConfirmDialogStore>({ open: false, callback: () => {} });

export default store;
