import { LoadingOverlay, Portal } from '@mantine/core';
import { useReadable } from 'react-use-svelte-store';
import loaderStore from './loaderStore';

const Loader = () => {
  const $store = useReadable(loaderStore);

  return (
    <Portal>
      <LoadingOverlay
        visible={$store.open}
        loaderProps={{ size: 'lg', variant: 'bars' }}
      />
    </Portal>
  );
};

export default Loader;
